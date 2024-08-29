import { json } from "@remix-run/node";
import { getEnvironmentDetails, getEnvironments } from "../../services/environments";
import { getRequiredEnvVar } from "~/common/utils/env.server";
import { EnvironmentStatusResponse } from "~/model/gen";
import { IssueBean } from "~/model/jira";

export interface LoaderData {
    environments: Array<EnvironmentStatusResponse>;
    issue: IssueBean | null;
}

export const loader = async () => {
    const devEnvironments = await getEnvironments();

    const environments = await Promise.all(devEnvironments.devnamespaces.map((env) => getEnvironmentDetails(env.name)));

    const response: LoaderData = {
        environments: environments,
        issue: null,
    };

    return json(response);
};
