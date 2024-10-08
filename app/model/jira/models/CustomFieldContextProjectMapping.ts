/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details of a context to project association.
 */
export type CustomFieldContextProjectMapping = {
    /**
     * The ID of the context.
     */
    readonly contextId: string;
    /**
     * Whether context is global.
     */
    readonly isGlobalContext?: boolean;
    /**
     * The ID of the project.
     */
    readonly projectId?: string;
};
