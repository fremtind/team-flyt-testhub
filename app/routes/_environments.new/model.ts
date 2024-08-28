import type { Branch } from "../../model/github";

export const services = [
    {
        label: "Frontend",
        inputName: "bm-web-frontend",
        repository: "bm-web-frontend",
        namespace: "forsikring-bm-web-frontend",
        locaServicePath: undefined,
        required: true,
    },
    {
        label: "Web",
        inputName: "bm-web",
        repository: "bm-web",
        namespace: "forsikring-bm-web",
        locaServicePath: undefined,
        required: true,
    },
    {
        label: "Avtale",
        inputName: "bm-avtale",
        repository: "bm-agreements",
        namespace: "forsikring-bm-avtale",
        locaServicePath: "services/bm/avtale",
        required: false,
    },
    {
        label: "Folkeregister",
        inputName: "bm-folkeregister",
        repository: "bm-folkeregister",
        namespace: "forsikring-bm-folkeregister",
        locaServicePath: "services/bm/folkeregister",
        required: false,
    },
    {
        label: "Organisasjon",
        inputName: "bm-organisasjon",
        repository: "bm-organization",
        namespace: "forsikring-bm-organisasjon",
        locaServicePath: "services/bm/organisasjon",
        required: false,
    },
    {
        label: "Dokumenter",
        inputName: "bm-dokumenter",
        repository: "bm-documents",
        namespace: "forsikring-bm-dokumenter",
        locaServicePath: "services/bm/dokumenter",
        required: false,
    },
    {
        label: "Login",
        inputName: "bm-web-login",
        repository: "bm-web-login",
        namespace: "forsikring-bm-web-login",
        locaServicePath: undefined,
        required: true,
    },
    {
        label: "API Gateway",
        inputName: "bm-api-gw",
        repository: "bm-api-gw",
        namespace: "forsikring-bm-api-gw",
        locaServicePath: "services/bm/api-gw",
        required: true,
    },
    {
        label: "Kjøp Frontend",
        inputName: "bm-kjop-frontend",
        repository: "bm-kjop",
        namespace: "bm-kjop-frontend",
        locaServicePath: undefined,
        required: true
    },
    {
        label: "Kjøp API",
        inputName: "bm-kjop-api",
        repository: "bm-kjop",
        namespace: "bm-kjop-api",
        locaServicePath: "services/bm/kjop-api",
        required: false
    },
] as const;

export type RepositoryWithBranch = {
    repo: (typeof services)[number]["repository"];
    branches: Array<Branch>;
};
