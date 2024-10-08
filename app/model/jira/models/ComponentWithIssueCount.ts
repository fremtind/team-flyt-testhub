/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from "./User";

/**
 * Details about a component with a count of the issues it contains.
 */
export type ComponentWithIssueCount = {
    /**
     * The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned to issues created with this component.
     */
    assignee?: User;
    /**
     * The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType` for details on how the type of the user, and hence the user, assigned to issues is determined. Takes the following values:
     *
     * *  `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the component is in.
     * *  `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.
     * *  `UNASSIGNED` an assignee is not set for issues created with this component.
     * *  `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the project that the component is in.
     */
    readonly assigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
    /**
     * The description for the component.
     */
    readonly description?: string;
    /**
     * The unique identifier for the component.
     */
    readonly id?: string;
    /**
     * Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set, then `false` is returned.
     */
    readonly isAssigneeTypeValid?: boolean;
    /**
     * Count of issues for the component.
     */
    readonly issueCount?: number;
    /**
     * The user details for the component's lead user.
     */
    lead?: User;
    /**
     * The name for the component.
     */
    readonly name?: string;
    /**
     * The key of the project to which the component is assigned.
     */
    readonly project?: string;
    /**
     * Not used.
     */
    readonly projectId?: number;
    /**
     * The user assigned to issues created with this component, when `assigneeType` does not identify a valid assignee.
     */
    realAssignee?: User;
    /**
     * The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This property is set to one of the following values:
     *
     * *  `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead has permission to be assigned issues in the project that the component is in.
     * *  `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component lead has permission to be assigned issues in the project that the component is in.
     * *  `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to allow unassigned issues.
     * *  `PROJECT_DEFAULT` when none of the preceding cases are true.
     */
    readonly realAssigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
    /**
     * The URL for this count of the issues contained in the component.
     */
    readonly self?: string;
};
