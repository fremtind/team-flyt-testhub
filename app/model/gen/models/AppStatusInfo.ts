/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Env } from "./Env";
import type { EnvFrom } from "./EnvFrom";
import type { RoutesInfo } from "./RoutesInfo";

export type AppStatusInfo = {
    name: string;
    status: string;
    image: string;
    updated: string;
    routes?: Array<RoutesInfo>;
    env?: Array<Env>;
    envFrom?: Array<EnvFrom>;
    annotations?: Record<string, string>;
};
