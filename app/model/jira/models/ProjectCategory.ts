/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A project category.
 */
export type ProjectCategory = {
    /**
     * The description of the project category.
     */
    description?: string;
    /**
     * The ID of the project category.
     */
    readonly id?: string;
    /**
     * The name of the project category. Required on create, optional on update.
     */
    name?: string;
    /**
     * The URL of the project category.
     */
    readonly self?: string;
};
