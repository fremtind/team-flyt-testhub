/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details of a field configuration.
 */
export type FieldConfiguration = {
    /**
     * The description of the field configuration.
     */
    description: string;
    /**
     * The ID of the field configuration.
     */
    id: number;
    /**
     * Whether the field configuration is the default.
     */
    isDefault?: boolean;
    /**
     * The name of the field configuration.
     */
    name: string;
};
