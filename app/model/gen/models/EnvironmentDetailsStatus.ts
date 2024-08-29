/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AppStatusInfo } from "./AppStatusInfo";

export type EnvironmentDetailsStatus = {
    name: string;
    team: string;
    ready: boolean;
    created: string;
    updated: string;
    expires: string;
    annotations: Record<string, string>;
    apps: Array<AppStatusInfo>;
};
