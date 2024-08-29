/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AppInfo } from "./AppInfo";

export type EnvironmentDeploymentRequest = {
    context: string;
    apps: Array<AppInfo>;
    hoursToLive?: number;
    baseEnvironment?: "test" | "dev" | "develop" | "at";
    localServicePaths?: Array<string>;
    resourceModifiers?: Array<
        | "AUTHORIZATION_POLICY_FROM_SOURCE_NAMESPACES"
        | "HTTP_ROUTE_DESTINATION"
        | "PGINSTANCE_WARM_STANDBY"
        | "WEBSSO_HEADER"
    >;
    excludedKinds?: Array<string>;
    excludedFiles?: Array<string>;
    secrets?: Record<string, Record<string, string>>;
    annotations?: Record<string, string>;
    createdBy?: string;
    customSubdomain?: string;
    omitNamespacePrefix?: boolean;
    omitNamespacePostfix?: boolean;
    additionalKubernetesResources?: Array<string>;
};
