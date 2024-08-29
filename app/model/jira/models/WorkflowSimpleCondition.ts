/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A workflow transition rule condition. This object returns `nodeType` as `simple`.
 */
export type WorkflowSimpleCondition = {
    /**
     * EXPERIMENTAL. The configuration of the transition rule.
     */
    configuration?: Record<string, any>;
    nodeType: "simple";
    /**
     * The type of the transition rule.
     */
    type: string;
};
