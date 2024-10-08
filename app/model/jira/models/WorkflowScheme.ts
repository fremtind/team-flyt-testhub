/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueTypeDetails } from "./IssueTypeDetails";
import type { User } from "./User";

/**
 * Details about a workflow scheme.
 */
export type WorkflowScheme = {
    /**
     * The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*.
     */
    defaultWorkflow?: string;
    /**
     * The description of the workflow scheme.
     */
    description?: string;
    /**
     * Whether the workflow scheme is a draft or not.
     */
    readonly draft?: boolean;
    /**
     * The ID of the workflow scheme.
     */
    readonly id?: number;
    /**
     * The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme.
     */
    issueTypeMappings?: Record<string, string>;
    /**
     * The issue types available in Jira.
     */
    readonly issueTypes?: Record<string, IssueTypeDetails>;
    /**
     * The date-time that the draft workflow scheme was last modified. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows.
     */
    readonly lastModified?: string;
    /**
     * The user that last modified the draft workflow scheme. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows.
     */
    readonly lastModifiedUser?: User;
    /**
     * The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme.
     */
    name?: string;
    /**
     * For draft workflow schemes, this property is the name of the default workflow for the original workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira.
     */
    readonly originalDefaultWorkflow?: string;
    /**
     * For draft workflow schemes, this property is the issue type to workflow mappings for the original workflow scheme, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme.
     */
    readonly originalIssueTypeMappings?: Record<string, string>;
    readonly self?: string;
    /**
     * Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:
     *
     * *  Update an active workflow scheme with `updateDraftIfNeeded` set to `true`: If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow scheme is created.
     * *  Update an active workflow scheme with `updateDraftIfNeeded` set to `false`: An error is returned, as active workflow schemes cannot be updated.
     * *  Update an inactive workflow scheme with `updateDraftIfNeeded` set to `true`: The workflow scheme is updated, as inactive workflow schemes do not require drafts to update.
     *
     * Defaults to `false`.
     */
    updateDraftIfNeeded?: boolean;
};
