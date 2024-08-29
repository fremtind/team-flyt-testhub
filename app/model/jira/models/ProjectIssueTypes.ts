/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProjectId } from "./ProjectId";

/**
 * Projects and issue types where the status is used. Only available if the `usages` expand is requested.
 */
export type ProjectIssueTypes = {
    /**
     * IDs of the issue types
     */
    issueTypes?: Array<string | null> | null;
    project?: ProjectId;
};
