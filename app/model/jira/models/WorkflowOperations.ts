/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Operations allowed on a workflow
 */
export type WorkflowOperations = {
    /**
     * Whether the workflow can be deleted.
     */
    canDelete: boolean;
    /**
     * Whether the workflow can be updated.
     */
    canEdit: boolean;
};
