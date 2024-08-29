/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorCollection } from "./ErrorCollection";
import type { WarningCollection } from "./WarningCollection";

export type NestedResponse = {
    errorCollection?: ErrorCollection;
    status?: number;
    warningCollection?: WarningCollection;
};
