/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details of the name, description, and default issue type for an issue type scheme.
 */
export type IssueTypeSchemeUpdateDetails = {
    /**
     * The ID of the default issue type of the issue type scheme.
     */
    defaultIssueTypeId?: string;
    /**
     * The description of the issue type scheme. The maximum length is 4000 characters.
     */
    description?: string;
    /**
     * The name of the issue type scheme. The name must be unique. The maximum length is 255 characters.
     */
    name?: string;
};
