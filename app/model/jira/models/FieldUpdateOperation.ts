/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details of an operation to perform on a field.
 */
export type FieldUpdateOperation = {
    /**
     * The value to add to the field.
     */
    add?: any;
    /**
     * The field value to copy from another issue.
     */
    copy?: any;
    /**
     * The value to edit in the field.
     */
    edit?: any;
    /**
     * The value to removed from the field.
     */
    remove?: any;
    /**
     * The value to set in the field.
     */
    set?: any;
};
