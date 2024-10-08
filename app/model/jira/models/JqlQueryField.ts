/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JqlQueryFieldEntityProperty } from "./JqlQueryFieldEntityProperty";

/**
 * A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries.
 */
export type JqlQueryField = {
    /**
     * The encoded name of the field, which can be used directly in a JQL query.
     */
    encodedName?: string;
    /**
     * The name of the field.
     */
    name: string;
    /**
     * When the field refers to a value in an entity property, details of the entity property value.
     */
    property?: Array<JqlQueryFieldEntityProperty>;
};
