/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JiraExpressionEvalContextBean } from "./JiraExpressionEvalContextBean";

export type JiraExpressionEvalRequestBean = {
    /**
     * The context in which the Jira expression is evaluated.
     */
    context?: JiraExpressionEvalContextBean;
    /**
     * The Jira expression to evaluate.
     */
    expression: string;
};
