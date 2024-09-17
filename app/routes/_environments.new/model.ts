import type { Branch } from "../../model/github";

export const services = [
    {
        label: "ActiveMQ",
        inputName: "flyt-activemq-mock",
        repository: "flyt-activemq-mock",
        namespace: "flyt-activemq-mock",
        locaServicePath: undefined,
        required: true,
    },
    {
        label: "Camunda Webapps",
        inputName: "flyt-camunda-webapps",
        repository: "flyt-camunda-webapps",
        namespace: "flyt-camunda-webapps",
        locaServicePath: undefined,
        required: true,
        envVars: {
            'SPRING_PROFILES_ACTIVE': "aws-dev, aws-postgres",
            'DB_SCHEMA': "flyt_backend",
            'DB_WRAPPER_PLUGINS': "iam",
            'DB_USER_PWD': "not-used-iam",
        }
    },
    {
        label: "Cammunda Optimize Indexer",
        inputName: "flyt-camunda-optimize-indexer",
        repository: "flyt-camunda-optimize-indexer",
        namespace: "flyt-camunda-optimize-indexer",
        locaServicePath: undefined,
        required: true,
        envVars: {
            'OPTIMIZE_ELASTICSEARCH_HOST': "elasticsearch-master",
            'OPTIMIZE_CAMUNDA_BPM_EVENT_IMPORT_ENABLED': "true",
            'OPTIMIZE_EVENT_BASED_PROCESSES_IMPORT_ENABLED': "true",
            'OPTIMIZE_CAMUNDABPM_REST_URL': "http://flyt-camunda-webapps:8080/engine-rest",
        }
    },
    {
        label: "Frontend",
        inputName: "flyt-frontend",
        repository: "flyt-frontend",
        namespace: "flyt-frontend",
        locaServicePath: undefined,
        required: true,
        envVars: {
            'FLYT_GATEWAY_NAME': "flyt-gateway"
        },
    },
    {
        label: "Backend",
        inputName: "flyt-backend",
        repository: "flyt-backend",
        namespace: "flyt-backend",
        locaServicePath: undefined,
        required: true,
        envVars: {
            'SPRING_PROFILES_ACTIVE': "aws-dev, aws-postgres, humio",
            'FIP_HOST': "fip-01.test.fremtind.no",
            '_JAVA_OPTIONS': "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005",
            'DB_SCHEMA': "flyt_backend",
            'DB_WRAPPER_PLUGINS': "iam",
            'DB_OWNER_USER_PWD': "not-used-iam",
            'DB_OWNER_PWD': "not-used-iam",
            
        }
    },
    {
        label: "Gateway",
        inputName: "flyt-gateway",
        repository: "flyt-gateway",
        namespace: "flyt-gateway",
        locaServicePath: undefined,
        required: true,
        envVars: {
            'SPRING_PROFILES_ACTIVE': "aws-dev",
            '_JAVA_OPTIONS': "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005",
            'FLYT_FRONTEND_URL': "-frontend.devns.devaws.fremtind.no",
            'FLYT_SECURITY_KEYCLOAK_ENABLED': "true",
            'FLYT_FRONTEND_PROTOCOL': "https://",
        },
    },
    {
        label: "JMS",
        inputName: "flyt-jms",
        repository: "flyt-jms",
        namespace: "flyt-jms",
        locaServicePath: undefined,
        required: true,
        envVars: {
            'SPRING_PROFILES_ACTIVE': "aws-dev, humio",
            '_JAVA_OPTIONS': "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005",
            'FLYT_BACKEND_URL': "flyt-backend",
            'FLYT_HV_SERVICE_URL': "flyt-hv-service",
            'JMS_ENABLED': "true",
            'JMS_HV_ENABLED': "true",
            'JMS_URL': "failover:(tcp://flyt-activemq-mock-comm:61616)",
        }
    },
    {
        label: "Communication",
        inputName: "flyt-communication",
        repository: "flyt-communication",
        namespace: "flyt-communication",
        locaServicePath: undefined,
        required: true,
        envVars: {
            'SPRING_PROFILES_ACTIVE': "aws-dev, aws-postgres, humio",
            'FIP_HOST': "fip-01.test.fremtind.no",
            '_JAVA_OPTIONS': "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005",
            'DB_SCHEMA': "flyt_communication",
            'TASKLIST_CAMUNDA_URL': "http://tasklist.mesh.internal",
        }
    },
    {
        label: "Helsevurdering",
        inputName: "flyt-hv-service",
        repository: "flyt-hv-service",
        namespace: "flyt-hv-service",
        locaServicePath: undefined,
        required: true,
        envVars: {
            'SPRING_PROFILES_ACTIVE': "aws-dev, aws-postgres, humio",
            'FIP_HOST': "fip-01.test.fremtind.no",
            '_JAVA_OPTIONS': "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005",
            'DB_SCHEMA': "flyt_health_assessment",
        }
    },
    {
        label: "Searchservice",
        inputName: "flyt-search-service",
        repository: "flyt-search-service",
        namespace: "flyt-search-service",
        locaServicePath: undefined,
        required: true,
        envVars: {
            'SPRING_PROFILES_ACTIVE': "aws-dev, aws-postgres, humio",
            'FIP_HOST': "fip-01.test.fremtind.no",
            '_JAVA_OPTIONS': "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005",
            'DB_SCHEMA': "flyt_backend",
            'DB_WRAPPER_PLUGINS': "iam",
            'DB_USER_PWD': "not-used-iam",
        }
    },
] as const;

export type RepositoryWithBranch = {
    repo: (typeof services)[number]["repository"];
    branches: Array<Branch>;
};
