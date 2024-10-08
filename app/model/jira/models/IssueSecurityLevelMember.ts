/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PermissionHolder } from "./PermissionHolder";

/**
 * Issue security level member.
 */
export type IssueSecurityLevelMember = {
    /**
     * The user or group being granted the permission. It consists of a `type` and a type-dependent `parameter`. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information.
     */
    holder: PermissionHolder;
    /**
     * The ID of the issue security level member.
     */
    id: number;
    /**
     * The ID of the issue security level.
     */
    issueSecurityLevelId: number;
};
