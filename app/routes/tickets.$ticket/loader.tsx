import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { EnvironmentStatusResponse } from "~/model/gen";
import type { IssueBean } from "~/model/jira";
import { getEnvironments, getEnvironmentDetails } from "~/services/environments";
import { services } from "../_environments.new/model";
import { toLower } from "lodash";

export interface LoaderData {
    environments: Array<EnvironmentStatusResponse>;
    issue: IssueBean | null;
}

export const loader = async ({ params }: LoaderArgs) => {
    const environments = await getEnvironments();
    const projectName = toLower(params.ticket);

    console.log("projectName", projectName);

    const relevantEnvironments = environments.devnamespaces.filter((env) => {
        console.log("env", env.name);
        let res = env.name.includes(projectName);
        console.log("res", res);
        return res;

    });
    console.log("relevantEnvironments",relevantEnvironments);

    const environmentDetailsFetcher = await Promise.all(
        relevantEnvironments.map((env) => getEnvironmentDetails(env.name))
    );

    const response: LoaderData = {
        environments: environmentDetailsFetcher,
        issue: projectName,
    };

    return json(response);
};
