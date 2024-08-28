import type { AppStatusInfo, Env, RoutesInfo } from "~/model/gen";
import { isDefined } from "./isDefined";

export const hostNameLabelMap = {
    "dnb-kunde": "DNB",
    "dnb-radgiver": "DNB Rådgiver",
    "sb1-kunde": "SB1",
    "sb1-radgiver": "SB1 Rådgiver",
} as const;

export const calculateAppReadiness = (input: string) => {
    const match = input.match(/\d+\/\d+/);
    if (match) {
        const numbers = match[0].split("/");
        const readyReplicas = parseInt(numbers[0], 10);
        const replicaTarget = parseInt(numbers[1], 10);

        return {
            ready: readyReplicas >= 1,
            replicas: readyReplicas,
            replicaTarget: replicaTarget,
            statusMessage: input,
        };
    }

    return undefined;
};

export const getAppFromEnvironment = (apps: Array<AppStatusInfo>, name: string) => {
    const app = apps.find((a) => a.name === name);
    return app;
};

export const getEnvironmentVariable = (envVariables: Array<Env>, variable: string) => {
    return envVariables.find((v) => v.name === variable)?.value;
};

export const getHostUrls = (routes: Array<RoutesInfo>) => {
    return routes.filter((route) => {
        if (!isDefined(route.name)) {
            return false;
        }

        if (route.name in hostNameLabelMap) {
            return true;
        }

        return false;
    });
};

const appendBedrift = (url: string) => {
    return url + "/bedrift/";
};

export const generateSwaggerUrl = (host: string) => {
    return appendBedrift(host) + "api/docs/swagger-ui/index.html?configUrl=/bedrift/api/docs/api-docs/swagger-config";
};

export const generateHumioUrl = (namespace: string) => {
    return `https://humio.intern.sparebank1.no/fremtind-test/search?live=false&query=%22k8s_namespace%22%20%3D%20%22${namespace}%22&start=24h`;
};

export const generateMockloginHostUrl =
    (mockloginUrl: { dnb: string; sb1: string }, selectedUser: string) =>
    (distributor: "sb1" | "dnb", host: string) => {
        const url = new URL(mockloginUrl[distributor]);
        url.searchParams.set("url", host + "/bedrift/");
        url.searchParams.set("fodselsnummer", selectedUser);
        return url.toString();
    };

export const generateBankIdLoginHostUrl = (loginHost: string, appHost: string) => {
    const url = new URL(appendBedrift(loginHost) + "login");
    url.searchParams.set("goto", appendBedrift(appHost));
    return url.toString();
};
