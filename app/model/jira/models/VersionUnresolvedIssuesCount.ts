/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Count of a version's unresolved issues.
 */
export type VersionUnresolvedIssuesCount = {
    /**
     * Count of issues.
     */
    readonly issuesCount?: number;
    /**
     * Count of unresolved issues.
     */
    readonly issuesUnresolvedCount?: number;
    /**
     * The URL of these count details.
     */
    readonly self?: string;
};
