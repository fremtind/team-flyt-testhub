/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details about syntax and type errors. The error details apply to the entire expression, unless the object includes:
 *
 * *  `line` and `column`
 * *  `expression`
 */
export type JiraExpressionValidationError = {
    /**
     * The text column in which the error occurred.
     */
    column?: number;
    /**
     * The part of the expression in which the error occurred.
     */
    expression?: string;
    /**
     * The text line in which the error occurred.
     */
    line?: number;
    /**
     * Details about the error.
     */
    message: string;
    /**
     * The error type.
     */
    type: "syntax" | "type" | "other";
};
