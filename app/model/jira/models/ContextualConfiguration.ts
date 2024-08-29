/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details of the contextual configuration for a custom field.
 */
export type ContextualConfiguration = {
    /**
     * The field configuration.
     */
    configuration?: any;
    /**
     * The ID of the field context the configuration is associated with.
     */
    readonly fieldContextId: string;
    /**
     * The ID of the configuration.
     */
    id: string;
    /**
     * The field value schema.
     */
    schema?: any;
};
