import type { Branch } from "../../model/github";

export const services = [
    {
        label: "Frontend",
        inputName: "flyt-frontend",
        repository: "flyt-frontend",
        namespace: "flyt-frontend",
        locaServicePath: undefined,
        required: true,
    },
    {
        label: "Backend",
        inputName: "flyt-backend",
        repository: "flyt-backend",
        namespace: "flyt-backend",
        locaServicePath: undefined,
        required: true,
    },
    {
        label: "Gateway",
        inputName: "flyt-gateway",
        repository: "flyt-gateway",
        namespace: "flyt-gateway",
        locaServicePath: undefined,
        required: true,
    },
    {
        label: "JMS",
        inputName: "flyt-jms",
        repository: "flyt-jms",
        namespace: "flyt-jms",
        locaServicePath: undefined,
        required: true,
    },
] as const;

export type RepositoryWithBranch = {
    repo: (typeof services)[number]["repository"];
    branches: Array<Branch>;
};
