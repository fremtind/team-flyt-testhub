/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JsonTypeBean } from "./JsonTypeBean";

/**
 * The metadata describing an issue field.
 */
export type FieldMetadata = {
    /**
     * The list of values allowed in the field.
     */
    readonly allowedValues?: Array<any>;
    /**
     * The URL that can be used to automatically complete the field.
     */
    readonly autoCompleteUrl?: string;
    /**
     * The configuration properties.
     */
    readonly configuration?: Record<string, any>;
    /**
     * The default value of the field.
     */
    readonly defaultValue?: any;
    /**
     * Whether the field has a default value.
     */
    readonly hasDefaultValue?: boolean;
    /**
     * The key of the field.
     */
    readonly key: string;
    /**
     * The name of the field.
     */
    readonly name: string;
    /**
     * The list of operations that can be performed on the field.
     */
    readonly operations: Array<string>;
    /**
     * Whether the field is required.
     */
    readonly required: boolean;
    /**
     * The data type of the field.
     */
    readonly schema: JsonTypeBean;
};
