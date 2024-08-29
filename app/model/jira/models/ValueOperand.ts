/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An operand that is a user-provided value.
 */
export type ValueOperand = {
    /**
     * Encoded value, which can be used directly in a JQL query.
     */
    encodedValue?: string;
    /**
     * The operand value.
     */
    value: string;
};
