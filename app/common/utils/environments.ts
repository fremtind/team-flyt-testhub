import type { AppStatusInfo, Env } from "~/model/gen";


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

export const generateSwaggerUrl = (host: string) => {
    return appendBedrift(host) + "api/docs/swagger-ui/index.html?configUrl=/bedrift/api/docs/api-docs/swagger-config";
};

export const generateHumioUrl = (namespace: string) => {
    return `https://humio.intern.sparebank1.no/fremtind-test/search?live=false&query=%22k8s_namespace%22%20%3D%20%22${namespace}%22&start=24h`;
};
