/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SecuritySchemeLevelMemberBean } from "./SecuritySchemeLevelMemberBean";

/**
 * Details of issue security scheme level new members.
 */
export type SecuritySchemeMembersRequest = {
    /**
     * The list of level members which should be added to the issue security scheme level.
     */
    members?: Array<SecuritySchemeLevelMemberBean>;
};
