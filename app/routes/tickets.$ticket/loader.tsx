import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { EnvironmentStatusResponse } from "~/model/gen";
import { getEnvironments, getEnvironmentDetails } from "~/services/environments";
import { toLower } from "lodash";

export interface LoaderData {
    environments: Array<EnvironmentStatusResponse>;
    issue: string | null;
}

export const loader = async ({ params }: LoaderArgs) => {
    const environments = await getEnvironments();
    const projectName = toLower(params.ticket);
    
    const relevantEnvironments = environments.devnamespaces.filter((env) => {
        return env.name.includes(projectName);
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
