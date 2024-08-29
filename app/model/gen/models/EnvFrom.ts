/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConfigMapRef } from "./ConfigMapRef";
import type { SecretRef } from "./SecretRef";

export type EnvFrom = {
    configMapRef?: ConfigMapRef;
    prefix?: string;
    secretRef?: SecretRef;
};
