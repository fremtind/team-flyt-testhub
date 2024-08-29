/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GroupName } from "./GroupName";
import type { ListWrapperCallbackGroupName } from "./ListWrapperCallbackGroupName";

export type SimpleListWrapperGroupName = {
    callback?: ListWrapperCallbackGroupName;
    items?: Array<GroupName>;
    "max-results"?: number;
    pagingCallback?: ListWrapperCallbackGroupName;
    size?: number;
};
