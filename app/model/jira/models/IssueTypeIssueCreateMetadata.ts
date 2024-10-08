/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FieldMetadata } from "./FieldMetadata";
import type { Scope } from "./Scope";

/**
 * Details of the issue creation metadata for an issue type.
 */
export type IssueTypeIssueCreateMetadata = {
    /**
     * The ID of the issue type's avatar.
     */
    readonly avatarId?: number;
    /**
     * The description of the issue type.
     */
    readonly description?: string;
    /**
     * Unique ID for next-gen projects.
     */
    readonly entityId?: string;
    /**
     * Expand options that include additional issue type metadata details in the response.
     */
    readonly expand?: string;
    /**
     * List of the fields available when creating an issue for the issue type.
     */
    readonly fields?: Record<string, FieldMetadata>;
    /**
     * Hierarchy level of the issue type.
     */
    readonly hierarchyLevel?: number;
    /**
     * The URL of the issue type's avatar.
     */
    readonly iconUrl?: string;
    /**
     * The ID of the issue type.
     */
    readonly id?: string;
    /**
     * The name of the issue type.
     */
    readonly name?: string;
    /**
     * Details of the next-gen projects the issue type is available in.
     */
    readonly scope?: Scope;
    /**
     * The URL of these issue type details.
     */
    readonly self?: string;
    /**
     * Whether this issue type is used to create subtasks.
     */
    readonly subtask?: boolean;
};
