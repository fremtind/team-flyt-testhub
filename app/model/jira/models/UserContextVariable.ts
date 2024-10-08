/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user) specified as an Atlassian account ID.
 */
export type UserContextVariable = {
    /**
     * The account ID of the user.
     */
    accountId: string;
    /**
     * Type of custom context variable.
     */
    type: "user";
};
