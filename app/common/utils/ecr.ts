import { getRequiredEnvVar } from "./env.server";

export const getEcrURI = (project: string, tag: string) => {
    return `${getRequiredEnvVar("ECR_URI")}/${project}-ecr:${tag}`;
};
