/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorCollection } from "./ErrorCollection";

export type BulkOperationErrorResult = {
    elementErrors?: ErrorCollection;
    failedElementNumber?: number;
    status?: number;
};
