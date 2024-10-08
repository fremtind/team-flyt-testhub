/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueEntityPropertiesForMultiUpdate } from "./IssueEntityPropertiesForMultiUpdate";

/**
 * A list of issues and their respective properties to set or update. See [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information.
 */
export type MultiIssueEntityProperties = {
    /**
     * A list of issue IDs and their respective properties.
     */
    issues?: Array<IssueEntityPropertiesForMultiUpdate>;
};
