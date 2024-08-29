import { defer } from "@remix-run/node";
import { getJiraIssueFromString } from "../../common/utils/jira";
import { getEnvironments } from "../../services/environments";
import { getBranchesForMultipleRepositories } from "../../services/github";
import type { BranchWithEnvironments } from "./model";

export const loader = async () => {
    const dataFetcher = new Promise<{ projects: string[]; branchCollection: BranchWithEnvironments[] }>(
        async (resolve) => {
            const branches = await getBranchesForMultipleRepositories([
                "bm-web-frontend",
                "bm-web",
                "bm-web-login",
                "bm-agreements",
                "bm-documents",
                "bm-folkeregister",
                "bm-organization",
                "bm-api-gw",
                "bm-kjop",
            ]);
            const relevantBranches = branches.flat().filter((branch) => {
                return ![/dependabot/].some((re) => re.test(branch?.name));
            });

            const branchCollection: Array<BranchWithEnvironments> = relevantBranches.map((branch) => ({
                branch,
                environments: [],
                ticket: getJiraIssueFromString(branch.name) ?? undefined,
            }));

            const devEnvironments = await getEnvironments();

            devEnvironments.devnamespaces.forEach((env) => {
                Object.entries(env.appAnnotations).forEach(([appName, annotations]) => {
                    if (!annotations.branch) {
                        return;
                    }

                    const envProject = appName.replace("forsikring-", "");
                    const branchName = annotations.branch;

                    const branchIndex = branchCollection.findIndex(
                        (branch) => branch.branch.name === branchName && branch.branch.project === envProject
                    );

                    if (branchIndex === -1) {
                        return;
                    }

                    branchCollection[branchIndex].environments.push(env);
                });
            });

            const projects = [...new Set(branchCollection.map((project) => project.branch.project))];
            resolve({ projects, branchCollection });
        }
    );

    return defer({ branchData: dataFetcher });
};
