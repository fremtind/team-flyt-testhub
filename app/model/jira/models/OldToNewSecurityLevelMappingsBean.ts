/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OldToNewSecurityLevelMappingsBean = {
    /**
     * The new issue security level ID. Providing null will clear the assigned old level from issues.
     */
    newLevelId: string;
    /**
     * The old issue security level ID. Providing null will remap all issues without any assigned levels.
     */
    oldLevelId: string;
};
