/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. Not all issues returned by the JQL query are loaded, only those described by the `startAt` and `maxResults` properties. To determine whether it is necessary to iterate to ensure all the issues returned by the JQL query are evaluated, inspect `meta.issues.jql.count` in the response.
 */
export type JexpJqlIssues = {
    /**
     * The maximum number of issues to return from the JQL query. Inspect `meta.issues.jql.maxResults` in the response to ensure the maximum value has not been exceeded.
     */
    maxResults?: number;
    /**
     * The JQL query.
     */
    query?: string;
    /**
     * The index of the first issue to return from the JQL query.
     */
    startAt?: number;
    /**
     * Determines how to validate the JQL query and treat the validation results.
     */
    validation?: "strict" | "warn" | "none";
};
