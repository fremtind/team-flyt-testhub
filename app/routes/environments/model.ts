import type { EnvironmentOverviewStatus } from "~/model/gen";

export interface BranchWithEnvironments {
    branch: {
        name: string;
        project: string;
    };
    environments: Array<EnvironmentOverviewStatus>;
    ticket?: string;
}

export interface EnvironmentsLoaderData {
    devEnvironments: {
        devnamespaces: Array<EnvironmentOverviewStatus>;
    };
}
