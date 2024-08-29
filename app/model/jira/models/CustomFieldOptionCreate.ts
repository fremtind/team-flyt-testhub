/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details of a custom field option to create.
 */
export type CustomFieldOptionCreate = {
    /**
     * Whether the option is disabled.
     */
    disabled?: boolean;
    /**
     * For cascading options, the ID of the custom field object containing the cascading option.
     */
    optionId?: string;
    /**
     * The value of the custom field option.
     */
    value: string;
};
