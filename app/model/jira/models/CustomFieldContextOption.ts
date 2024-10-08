/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details of the custom field options for a context.
 */
export type CustomFieldContextOption = {
    /**
     * Whether the option is disabled.
     */
    disabled: boolean;
    /**
     * The ID of the custom field option.
     */
    id: string;
    /**
     * For cascading options, the ID of the custom field option containing the cascading option.
     */
    optionId?: string;
    /**
     * The value of the custom field option.
     */
    value: string;
};
