/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JqlQueryField } from "./JqlQueryField";

/**
 * An element of the order-by JQL clause.
 */
export type JqlQueryOrderByClauseElement = {
    /**
     * The direction in which to order the results.
     */
    direction?: "asc" | "desc";
    field: JqlQueryField;
};
