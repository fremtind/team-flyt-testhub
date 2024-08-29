/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationRole } from "./ApplicationRole";
import type { ListWrapperCallbackApplicationRole } from "./ListWrapperCallbackApplicationRole";

export type SimpleListWrapperApplicationRole = {
    callback?: ListWrapperCallbackApplicationRole;
    items?: Array<ApplicationRole>;
    "max-results"?: number;
    pagingCallback?: ListWrapperCallbackApplicationRole;
    size?: number;
};
