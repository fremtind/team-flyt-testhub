/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FilterSubscriptionsList } from "./FilterSubscriptionsList";
import type { SharePermission } from "./SharePermission";
import type { User } from "./User";
import type { UserList } from "./UserList";

/**
 * Details about a filter.
 */
export type Filter = {
    /**
     * A description of the filter.
     */
    description?: string;
    /**
     * The groups and projects that can edit the filter.
     */
    editPermissions?: Array<SharePermission>;
    /**
     * Whether the filter is selected as a favorite.
     */
    favourite?: boolean;
    /**
     * The count of how many users have selected this filter as a favorite, including the filter owner.
     */
    readonly favouritedCount?: number;
    /**
     * The unique identifier for the filter.
     */
    readonly id?: string;
    /**
     * The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*.
     */
    jql?: string;
    /**
     * The name of the filter. Must be unique.
     */
    name: string;
    /**
     * The user who owns the filter. This is defaulted to the creator of the filter, however Jira administrators can change the owner of a shared filter in the admin settings.
     */
    readonly owner?: User;
    /**
     * A URL to view the filter results in Jira, using the [Search for issues using JQL](#api-rest-api-3-filter-search-get) operation with the filter's JQL string to return the filter results. For example, *https://your-domain.atlassian.net/rest/api/3/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug*.
     */
    readonly searchUrl?: string;
    /**
     * The URL of the filter.
     */
    readonly self?: string;
    /**
     * The groups and projects that the filter is shared with.
     */
    sharePermissions?: Array<SharePermission>;
    /**
     * A paginated list of the users that the filter is shared with. This includes users that are members of the groups or can browse the projects that the filter is shared with.
     */
    readonly sharedUsers?: UserList;
    /**
     * A paginated list of the users that are subscribed to the filter.
     */
    readonly subscriptions?: FilterSubscriptionsList;
    /**
     * A URL to view the filter results in Jira, using the ID of the filter. For example, *https://your-domain.atlassian.net/issues/?filter=10100*.
     */
    readonly viewUrl?: string;
};
