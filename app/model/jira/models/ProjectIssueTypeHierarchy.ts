/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProjectIssueTypesHierarchyLevel } from "./ProjectIssueTypesHierarchyLevel";

/**
 * The hierarchy of issue types within a project.
 */
export type ProjectIssueTypeHierarchy = {
    /**
     * Details of an issue type hierarchy level.
     */
    readonly hierarchy?: Array<ProjectIssueTypesHierarchyLevel>;
    /**
     * The ID of the project.
     */
    readonly projectId?: number;
};
