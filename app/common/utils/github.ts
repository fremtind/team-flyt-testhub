import { getJiraIssueFromString } from "./jira";

type InputType = {
    name: string;
};

export const consollidateBranchesByJiraTicket = <T = {}>(branches: Array<InputType & T>) => {
    const consollidatedBranches = branches.reduce<Record<string, Array<InputType & T>>>((acc, branch) => {
        const branchIndex = getJiraIssueFromString(branch.name) || branch.name;
        const existingBranches = acc[branchIndex] || [];
        return {
            ...acc,
            [branchIndex]: [...existingBranches, branch],
        };
    }, {});

    return consollidatedBranches;
};

export const getBranchesForJiraTicket = <T = {}>(branches: Array<InputType & T>, jiraTicket: string) => {
    const consollidatedBranches = consollidateBranchesByJiraTicket(branches);
    return consollidatedBranches[jiraTicket] || undefined;
};
