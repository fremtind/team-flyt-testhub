import type { IssueBean } from "../model/jira";
import { jiraApi } from "./fetcher";

export const getIssue = async (issueId: string) => {
    return jiraApi.get<IssueBean>(`issue/${issueId}`);
};
