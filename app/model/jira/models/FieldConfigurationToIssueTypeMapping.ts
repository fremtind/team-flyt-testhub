/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The field configuration to issue type mapping.
 */
export type FieldConfigurationToIssueTypeMapping = {
    /**
     * The ID of the field configuration.
     */
    fieldConfigurationId: string;
    /**
     * The ID of the issue type or *default*. When set to *default* this field configuration issue type item applies to all issue types without a field configuration. An issue type can be included only once in a request.
     */
    issueTypeId: string;
};
