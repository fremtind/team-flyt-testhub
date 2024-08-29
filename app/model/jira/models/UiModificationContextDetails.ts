/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The details of a UI modification's context, which define where to activate the UI modification.
 */
export type UiModificationContextDetails = {
    /**
     * The ID of the UI modification context.
     */
    readonly id?: string;
    /**
     * Whether a context is available. For example, when a project is deleted the context becomes unavailable.
     */
    readonly isAvailable?: boolean;
    /**
     * The issue type ID of the context.
     */
    issueTypeId: string;
    /**
     * The project ID of the context.
     */
    projectId: string;
    /**
     * The view type of the context. Only `GIC` (Global Issue Create) is supported.
     */
    viewType: string;
};
