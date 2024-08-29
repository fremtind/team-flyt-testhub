/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Comment } from "./Comment";

export type PaginatedResponseComment = {
    maxResults?: number;
    results?: Array<Comment>;
    startAt?: number;
    total?: number;
};
