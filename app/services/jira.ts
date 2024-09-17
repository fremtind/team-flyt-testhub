import type { IssueBean, IssueLink, IssueList } from "../model/jira";
import { jiraApi } from "./fetcher";

export const getIssue = async (issueId: string) => {
    return jiraApi.get<IssueBean>(`issue/${issueId}`);
};

export const getIssuesFromColumn = async (columnId: string) => {
    // let res = await jiraApi.get<any>(`search?jql=project="FLYT&fields=id`);
    //search?jql=project=FLYT&status=10055&fields=id,summary
    // console.log(res.issues);

    let mock = [
        {
            "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            "id": "218421",
            "self": "https://fremtind.atlassian.net/rest/api/3/issue/218421",
            "key": "FLYT-2574",
            "fields": {
              "summary": "Feil innmeldt/utmeldt dato for LO medlemmer som er utmeldt"
            }
          },
          {
            "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            "id": "218395",
            "self": "https://fremtind.atlassian.net/rest/api/3/issue/218395",
            "key": "FLYT-2573",
            "fields": {
              "summary": "Avklare no.fremtind.fip.api:fip-api-jakarta LATEST versjon"
            }
          },
          {
            "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            "id": "218378",
            "self": "https://fremtind.atlassian.net/rest/api/3/issue/218378",
            "key": "FLYT-2572",
            "fields": {
              "summary": "Får ikke opp dokumenter i arkivet #2"
            }
          },
    ];
    return mock.map((issue) => {
        return {
            id: issue.key,
            title: issue.fields.summary,
        };
    });
    //return jiraApi.get<IssueBean[]>(`board/${boardId}/issue?jql=column=${columnId}`); &project=FLYT&fields=id
}
