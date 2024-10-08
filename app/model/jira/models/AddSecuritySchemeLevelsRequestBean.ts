/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SecuritySchemeLevelBean } from "./SecuritySchemeLevelBean";

export type AddSecuritySchemeLevelsRequestBean = {
    /**
     * The list of scheme levels which should be added to the security scheme.
     */
    levels?: Array<SecuritySchemeLevelBean>;
};
