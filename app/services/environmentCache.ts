import { emitter } from "./emitter";
import { isEqual } from "lodash";
import type { EnvironmentStatusResponse } from "../model/gen";
import { getEnvironmentDetails, getEnvironments } from "./environments";
import { isDefined } from "~/common/utils/isDefined";

class EnvironmentCache<T> {
    environmentCache: Map<string, Array<T>>;
    emitter: typeof emitter;

    constructor() {
        this.environmentCache = new Map();
        this.emitter = emitter;
    }

    has(key: string) {
        return this.environmentCache.has(key);
    }

    set(key: string, value: Array<T>) {
        if (!this.environmentCache.has(key) || !isEqual(this.environmentCache.get(key), value)) {
            this.environmentCache.set(key, value);
            this.emitter.emit(key, value);
        }
    }

    get(key: string) {
        return this.environmentCache.get(key);
    }

    getAll() {
        return Object.fromEntries(this.environmentCache.entries());
    }
}

export const environmentDetailsStatus = new EnvironmentCache<EnvironmentStatusResponse | undefined>();

export const fetchEnvironmentDetailsStatus = async () => {
    const branches = Object.keys(environmentDetailsStatus.getAll());

    if (!branches.length) {
        return;
    }

    const environments = await getEnvironments();
    const relevantEnvironments = environments.devnamespaces.filter((env) => {
        return branches.some((branch) => {
            const appAnnotationList = Object.values(env.appAnnotations);
            return appAnnotationList.some((annotation) => annotation.branch === branch);
        });
    });

    const environmentDetailsFetcher = await Promise.all(
        relevantEnvironments.map((env) => {
            return new Promise<EnvironmentStatusResponse | undefined>(async (resolve) => {
                try {
                    const d = await getEnvironmentDetails(env.name);
                    resolve(d);
                } catch (e) {
                    resolve(undefined);
                }
            });
        })
    );

    const environmentsGroupedByBranch = environmentDetailsFetcher.filter(isDefined).reduce((acc, env) => {
        const annotatedBranches = env.environment.apps
            .map((a) => {
                return a.annotations?.branch;
            })
            .filter(isDefined);

        annotatedBranches.forEach((branch) => {
            if (!acc[branch]) {
                acc[branch] = [];
            }

            if (!acc[branch].find((branchEnvironment) => branchEnvironment.environment.name === env.environment.name)) {
                acc[branch].push(env);
            }
        });
        return acc;
    }, {} as Record<string, Array<EnvironmentStatusResponse>>);

    Object.entries(environmentsGroupedByBranch).forEach(([issue, environments]) => {
        environmentDetailsStatus.set(issue, environments);
    });
};
