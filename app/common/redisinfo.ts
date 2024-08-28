 const localRedisInfo= {
    host: "redis-local",
    port: "6379",
    password: "password",
    usessl: "false"
}

const redisDeployment = 
        {
            "apiVersion": "apps/v1",
            "kind": "Deployment",
            "metadata": {
                "name": "redis-deployment"
            },
            "spec": {
                "replicas": 1,
                "selector": {
                    "matchLabels": {
                        "app": "redis-pod"
                    }
                },
                "template": {
                    "metadata": {
                        "labels": {
                            "app": "redis-pod"
                        }
                    },
                    "spec": {
                        "containers": [
                            {
                                "name": "redis-pod",
                                "image": "docker.intern.sparebank1.no/testhub/redis:7.2.4",
                                "livenessProbe": {
                                    "exec": {
                                        "command": ["sh", "-c", "if redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD ping | grep -q 'PONG'; then exit 0; else exit 1; fi"]
                                    },
                                    "initialDelaySeconds": 10,
                                    "timeoutSeconds": 5
                                },
                                "resources": {
                                    "requests": {
                                      "memory": "256Mi",
                                      "cpu": "100m"
                                    },
                                    "limits": {
                                      "memory": "512Mi",
                                      "cpu": "200m"
                                    }
                                },
                                "ports": [
                                    {
                                        "containerPort": localRedisInfo.port
                                    }
                                ],
                                "env": [
                                    {
                                        "name": "REDIS_HOST",
                                        "value": localRedisInfo.host
                                    },
                                    {
                                        "name": "REDIS_PASSWORD",
                                        "value": localRedisInfo.password
                                    },
                                    {
                                        "name": "REDIS_PORT",
                                        "value": localRedisInfo.port
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
            "dependsOn": [
                {
                    "name": localRedisInfo.host,
                    "kind": "Service"
                }
            ]
        }
        const redisService =
        {
            "apiVersion": "v1",
            "kind": "Service",
            "metadata": {
                "name": localRedisInfo.host
            },
            "spec": {
                "selector": {
                    "app": "redis-pod"
                },
                "ports": [
                    {
                        "name": "redis-port",
                        "port": localRedisInfo.port,
                        "protocol": "TCP"
                    }
                ]
            }
        }

export const redisResources = [JSON.stringify(redisService, null, 2),JSON.stringify(redisDeployment, null, 2)]

export const secretsForNamespace: Record<string, Record<string, string>> = {
    "redis-conn": {
        "REDIS_HOST": btoa(localRedisInfo.host),
        "REDIS_PASSWORD": btoa(localRedisInfo.password),
        "REDIS_PORT": btoa(localRedisInfo.port),
        "REDIS_USESSL": btoa(localRedisInfo.usessl)
    }
};