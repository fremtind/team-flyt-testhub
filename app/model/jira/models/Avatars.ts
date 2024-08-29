/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Avatar } from "./Avatar";

/**
 * Details about system and custom avatars.
 */
export type Avatars = {
    /**
     * Custom avatars list.
     */
    readonly custom?: Array<Avatar>;
    /**
     * System avatars list.
     */
    readonly system?: Array<Avatar>;
};
