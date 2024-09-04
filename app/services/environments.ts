import { z } from "zod";
import { getFormDataFromRequest } from "~/common/utils/formdata";
import { getRequiredEnvVar } from "../common/utils/env.server";
import type {
    AppInfo,
    EnvironmentDeploymentRequest,
    EnvironmentListResponse,
    EnvironmentStatusResponse,
} from "../model/gen";
import { testhubApi } from "./fetcher";
import { getEcrURI } from "~/common/utils/ecr";
import { isDefined } from "~/common/utils/isDefined";
import { services } from "~/routes/_environments.new/model";
import type { Fip } from "~/common/utils/fip";
import { fipMap } from "~/common/utils/fip";
import { secretsForNamespace, redisResources } from "~/common/redisinfo";

export const getEnvironments = () => {
    return testhubApi.get<EnvironmentListResponse>(`environments/${getRequiredEnvVar("TESTHUB_TEAM")}`)
        .catch((e) => {
            console.error("could not fetch environments", e);
            return { devnamespaces: [] };
        }
    );
};

export const getEnvironmentDetails = (environmentNamespace: string) => {
    return testhubApi.get<EnvironmentStatusResponse>(
        `environments/${getRequiredEnvVar("TESTHUB_TEAM")}/${environmentNamespace}`
    ).catch((e) => {
        console.error("could not fetch environment details", e);
        return <EnvironmentStatusResponse>{ environment: {} };
        }
    );
};

export const createEnvironment = async (data: EnvironmentDeploymentRequest) => {
    const localServices: string[] = services
        .filter((service) => data.apps.some((app) => app.name === service.namespace))
        .filter((s) => s.locaServicePath !== undefined)
        .map((matchedService) => matchedService.locaServicePath as string);
    
    const blob: EnvironmentDeploymentRequest = {
        ...data,
        resourceModifiers: ["AUTHORIZATION_POLICY_FROM_SOURCE_NAMESPACES", "HTTP_ROUTE_DESTINATION"],
        excludedKinds: ["pginstanceshared","rediscluster", "namespace", "devnamespace"],
        secrets: secretsForNamespace,
        localServicePaths: localServices,
        additionalKubernetesResources: redisResources,
        omitNamespacePostfix: true,
        omitNamespacePrefix: true,
    };
    
    return testhubApi.post<EnvironmentStatusResponse, EnvironmentDeploymentRequest>(
        `environments/${getRequiredEnvVar("TESTHUB_TEAM")}`,
        blob
    );
};

export const deleteEnvironment = async (namespace: string) => {
    return testhubApi.delete(`environments/${getRequiredEnvVar("TESTHUB_TEAM")}/${namespace}`);
};

const serviceSchema = z
    .string()
    .transform((input) => input.split(";"))
    .optional();

const schema = z.object({
    "flyt-frontend": serviceSchema,
    "flyt-backend": serviceSchema,
    "flyt-gateway": serviceSchema,
    "flyt-jms": serviceSchema,
    // "flyt-camunda-webapps": serviceSchema,
    hoursToLive: z.coerce.number().default(24 * 5),
    fip: z.string({ required_error: "Du må velge FIP-miljø" }).nonempty({ message: "Du må velge FIP-miljø" }),
    context: z
        .string({ required_error: "Du må gi prosjektet et navn" })
        .max(64, { message: "Navnet kan maks være 20 tegn langt" })
        .min(0, { message: "Navnet må ha en lengde" }),
});

export const parseFormData = async (request: Request) => {
    const formData = await getFormDataFromRequest(request);
    const parsedFormData = schema.safeParse(formData);

    return parsedFormData;
};

export const createEnvironmentPayload = (data: z.infer<typeof schema>) => {
    const { context, hoursToLive, fip, ...apps } = data;

    const appList = services.map((service) => {
        const [branch, commitHash] = apps[service.inputName] ?? ["", ""];
        if (commitHash) {
            return createAppDefinition(service.namespace, commitHash, branch, fip as Fip);
        } else {
            if (service.required) {
                return createAppDefinition(service.namespace, "", "", fip as Fip);
            }
        }
    });

    const payload = {
        context,
        baseEnvironment: fip.toLocaleLowerCase() === "at" ? "at" : "test",
        apps: appList.filter(isDefined),
        hoursToLive: Math.min(hoursToLive, 168),
    };
    return payload;
};

const createAppDefinition = (
    name: (typeof services)[number]["namespace"],
    commitHash: string,
    branch: string,
    fip: Fip
) => {

    const envVars:{ [key: string]: string }= {
            "forsikring.fip.url-aws": fipMap[fip].aws,
            "forsikring.fip.url-on-prem": fipMap[fip].onPrem,
            "spring.data.redis.cluster.nodes": "",
            "QUARKUS_REDIS_HOSTS": "redis://$(REDIS_HOST):$(REDIS_PORT)",
            "QUARKUS_REDIS_CLIENT_TYPE": "standalone",
            };
            
    
    const app: AppInfo = {
        name,
        environmentVariables: envVars,
        annotations: {
            branch: branch || "main",
        }
    };

    if (commitHash) {
        app.image = getEcrURI(app.name, `${branch}-${commitHash}`);
    }

    return app;
};
