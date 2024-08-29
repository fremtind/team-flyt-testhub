/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserFilter } from "./UserFilter";

/**
 * Defaults for a Forge user custom field.
 */
export type CustomFieldContextDefaultValueForgeUserField = {
    /**
     * The ID of the default user.
     */
    accountId: string;
    /**
     * The ID of the context.
     */
    contextId: string;
    type: "forge.user";
    userFilter: UserFilter;
};
