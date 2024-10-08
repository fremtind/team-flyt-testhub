/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Details of a screen.
 */
export type UpdateScreenDetails = {
    /**
     * The description of the screen. The maximum length is 255 characters.
     */
    description?: string;
    /**
     * The name of the screen. The name must be unique. The maximum length is 255 characters.
     */
    name?: string;
};
