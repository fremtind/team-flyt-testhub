/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The default value for a User Picker (multiple) custom field.
 */
export type CustomFieldContextDefaultValueMultiUserPicker = {
    /**
     * The IDs of the default users.
     */
    accountIds: Array<string>;
    /**
     * The ID of the context.
     */
    contextId: string;
    type: "multi.user.select";
};
