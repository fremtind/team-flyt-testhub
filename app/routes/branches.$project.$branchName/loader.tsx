import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getRequiredEnvVar } from "~/common/utils/env.server";
import { getJiraIssueFromString } from "~/common/utils/jira";
import type { EnvironmentStatusResponse } from "~/model/gen";
import type { Branch } from "~/model/github";
import type { IssueBean } from "~/model/jira";
import { getEnvironments, getEnvironmentDetails } from "~/services/environments";
import { getBranches } from "~/services/github";
import { services } from "../_environments.new/model";

export interface LoaderData {
    environments: Array<EnvironmentStatusResponse>;
    issue: IssueBean | null;
    githubBranch: Branch | undefined;
}

export const loader = async ({ params }: LoaderArgs) => {
    const environments = await getEnvironments();

    const branchName = params.branchName ?? "";
    const projectName = params.project;

    const branches = (await getBranches(projectName!)) ?? [];
    const githubBranch = branches.find((branch) => branch.name === branchName);

    const jiraIssue = getJiraIssueFromString(branchName);
    const filterParams = [branchName];

    if (jiraIssue) {
        filterParams.push(jiraIssue);
    }

    const relevantEnvironments = environments.devnamespaces.filter((env) => {
        const branchMatches = Object.entries(env.appAnnotations).some(([annotationProjectName, annotation]) => {
            const service = services.find((service) => service.namespace === annotationProjectName);

            if (!service) {
                return false;
            }

            const isSameBranch = annotation.branch === branchName;
            const isSameProject = service.repository === projectName;

            return isSameBranch && isSameProject;
        });

        return filterParams.some((param) => env.name.includes(param) || branchMatches);
    });

    const environmentDetailsFetcher = await Promise.all(
        relevantEnvironments.map((env) => getEnvironmentDetails(env.name))
    );

    const response: LoaderData = {
        environments: environmentDetailsFetcher,
        issue: null,
        githubBranch,
    };

    return json(response);
};
