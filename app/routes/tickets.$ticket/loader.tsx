import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { EnvironmentStatusResponse } from "~/model/gen";
import type { IssueBean } from "~/model/jira";
import { getEnvironments, getEnvironmentDetails } from "~/services/environments";
import { services } from "../_environments.new/model";

export interface LoaderData {
    environments: Array<EnvironmentStatusResponse>;
    issue: IssueBean | null;
}

export const loader = async ({ params }: LoaderArgs) => {
    const environments = await getEnvironments();

    const projectName = params.ticket;

    const filterParams = [projectName];
    const relevantEnvironments = environments.devnamespaces.filter((env) => {
        if (!env.appAnnotations) {
            return false;
        }
        const branchMatches = Object.entries(env.appAnnotations).some(([annotationProjectName]) => {
            const service = services.find((service) => service.namespace === annotationProjectName);

            if (!service) {
                return false;
            }

            const isSameProject = service.repository === projectName;

            return isSameProject;
        });

        return filterParams.some((param) => env.name.includes(param));
    });

    const environmentDetailsFetcher = await Promise.all(
        relevantEnvironments.map((env) => getEnvironmentDetails(env.name))
    );

    const response: LoaderData = {
        environments: environmentDetailsFetcher,
        issue: projectName,
    };

    return json(response);
};
