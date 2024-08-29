/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SimpleLink } from "./SimpleLink";
import type { VersionIssuesStatus } from "./VersionIssuesStatus";

/**
 * Details about a project version.
 */
export type Version = {
    /**
     * Indicates that the version is archived. Optional when creating or updating a version.
     */
    archived?: boolean;
    /**
     * The description of the version. Optional when creating or updating a version.
     */
    description?: string;
    /**
     * Use [expand](em>#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:
     *
     * *  `operations` Returns the list of operations available for this version.
     * *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.
     *
     * Optional for create and update.
     */
    expand?: string;
    /**
     * The ID of the version.
     */
    readonly id?: string;
    /**
     * If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.
     */
    readonly issuesStatusForFixVersion?: VersionIssuesStatus;
    /**
     * The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version.
     */
    moveUnfixedIssuesTo?: string;
    /**
     * The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters.
     */
    name?: string;
    /**
     * If the expand option `operations` is used, returns the list of operations available for this version.
     */
    readonly operations?: Array<SimpleLink>;
    /**
     * Indicates that the version is overdue.
     */
    readonly overdue?: boolean;
    /**
     * Deprecated. Use `projectId`.
     */
    project?: string;
    /**
     * The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version.
     */
    projectId?: number;
    /**
     * The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.
     */
    releaseDate?: string;
    /**
     * Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version.
     */
    released?: boolean;
    /**
     * The URL of the version.
     */
    readonly self?: string;
    /**
     * The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.
     */
    startDate?: string;
    /**
     * The date on which work on this version is expected to finish, expressed in the instance's *Day/Month/Year Format* date format.
     */
    readonly userReleaseDate?: string;
    /**
     * The date on which work on this version is expected to start, expressed in the instance's *Day/Month/Year Format* date format.
     */
    readonly userStartDate?: string;
};
