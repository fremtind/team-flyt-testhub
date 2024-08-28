import { useRef } from "react";
import { useSubmit } from "@remix-run/react";
import { isDefined } from "../../common/utils/isDefined";
import { getFipLabelByUrl } from "~/common/utils/fip";
import type { EnvironmentDetailsStatus, RoutesInfo } from "../../model/gen";
import { InfoTag, SuccessTag } from "@fremtind/jkl-tag-react";
import { PrimaryButton, SecondaryButton } from "@fremtind/jkl-button-react";

import {
    calculateAppReadiness,
    generateBankIdLoginHostUrl,
    generateHumioUrl,
    generateMockloginHostUrl,
    generateSwaggerUrl,
    getAppFromEnvironment,
    getEnvironmentVariable,
    getHostUrls,
} from "../../common/utils/environments";
import { format } from "date-fns";
import type { ValuePair } from "@fremtind/jkl-core";
import { DistributorLink } from "../DistributorLink";
import { RadgiverLogin } from "../RadgiverLogin";
import { ContextualMenu, ContextualMenuItem } from "@fremtind/jkl-contextual-menu-react";
import { Dialog } from "../Dialog";
import { ModalInstance } from "@fremtind/jkl-modal-react";

interface Props {
    environment: EnvironmentDetailsStatus;
    mocklogin: {
        dnb: string;
        sb1: string;
    };
    selectedUser: string;
}

const hostNameLabelMap: Record<string, string> = {
    "dnb-kunde": "DNB",
    "dnb-radgiver": "DNB Rådgiver",
    "sb1-kunde": "SB1",
    "sb1-radgiver": "SB1 Rådgiver",
};

const getHost = (hostKey: keyof typeof hostNameLabelMap, hosts: Array<RoutesInfo>) => {
    const host = hosts.find((host) => host.name === hostKey);

    if (!host) {
        return "";
    }

    if (!host.name || !hostNameLabelMap[host.name]) {
        return "";
    }

    return host.host;
};

export const EnvironmentSection = ({ environment, mocklogin, selectedUser }: Props) => {
    const appDialogRef = useRef<ModalInstance | null>();
    const jsonDialogRef = useRef<ModalInstance | null>();
    const dialogRef = useRef<ModalInstance | null>();
    const userOrg = selectedUser ? selectedUser : "05876798923";

    const submit = useSubmit();

    const frontendApp = getAppFromEnvironment(environment.apps, "forsikring-bm-web-frontend");
    const loginApp = getAppFromEnvironment(environment.apps, "forsikring-bm-web-login");
    const webApp = getAppFromEnvironment(environment.apps, "forsikring-bm-web");
    const apiGwApp = getAppFromEnvironment(environment.apps, "forsikring-bm-api-gw");

    const handleDeleteEnvironment = () => {
        if (!confirm("Er du sikker på at du vil slette dette miljøet?")) {
            return;
        }

        submit({ namespace: environment.name }, { method: "DELETE" });
    };

    if (!frontendApp) {
        return (
            <section
                key={environment.name}
                id={environment.name}
                className="bg-hvit border-dis border rounded-lg p-24 mb-32 max-w-5xl"
            >
                <div className="flex justify-between w-full mb-24">
                    <h4 className="j-h3">{environment.name}</h4>
                    <div>
                        <ContextualMenu triggerElement={<SecondaryButton density="compact">Mer...</SecondaryButton>}>
                            <ContextualMenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    appDialogRef.current?.show();
                                }}
                            >
                                Oversikt over tjenestene
                            </ContextualMenuItem>
                            <ContextualMenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    jsonDialogRef.current?.show();
                                }}
                            >
                                Vis JSON
                            </ContextualMenuItem>
                            <ContextualMenuItem onClick={handleDeleteEnvironment}>Slett</ContextualMenuItem>
                        </ContextualMenu>
                    </div>
                </div>
                <div className="flex gap-40">
                    Ingen apper definert i Kubernetes 🧐
                    <br /> Prøv å slette miljøet og opprette det på nytt...
                </div>
            </section>
        );
    }

    const fipAppUrl = getEnvironmentVariable(webApp?.env ?? [], "FORSIKRING_FIP_URL");

    const frontendAppHostUrls = getHostUrls(frontendApp.routes ?? []);
    const loginAppHostUrls = getHostUrls(loginApp?.routes ?? []);

    const sb1LoginHost = getHost("sb1-kunde", frontendAppHostUrls);
    const dnbLoginHost = getHost("dnb-kunde", frontendAppHostUrls);

    const createMockloginUrl = generateMockloginHostUrl(mocklogin, userOrg);

    const advisorHosts = [
        {
            value: getHost("sb1-radgiver", frontendAppHostUrls),
            label: "SpareBank1",
        },
        {
            value: getHost("dnb-radgiver", frontendAppHostUrls),
            label: "DNB",
        },
    ].filter((host): host is ValuePair => isDefined(host.value));

    const copyJsonToClipboard = () => {
        const json = JSON.stringify(environment, null, 2);
        navigator.clipboard.writeText(json);
    };

    const readyApplications = environment.apps
        .map((app) => calculateAppReadiness(app.status))
        .reduce(
            (acc, readiness) => {
                if (readiness?.ready) {
                    acc.ready += 1;
                }
                acc.total += 1;

                return acc;
            },
            { ready: 0, total: 0 }
        );
    const readinessString = `${readyApplications.ready}/${readyApplications.total} tjenester kjører`;

    return (
        <section
            key={environment.name}
            id={environment.name}
            className="bg-hvit border-dis border rounded-lg p-24 mb-32 max-w-5xl"
        >
            <div className="flex justify-between w-full">
                <h4 className="j-h3">{environment.name}</h4>
                <div>
                    <ContextualMenu triggerElement={<SecondaryButton density="compact">Mer...</SecondaryButton>}>
                        <ContextualMenuItem
                            onClick={() => {
                                appDialogRef.current?.show();
                            }}
                        >
                            Oversikt over tjenestene
                        </ContextualMenuItem>
                        <ContextualMenuItem
                            onClick={() => {
                                jsonDialogRef.current?.show();
                            }}
                        >
                            Vis JSON
                        </ContextualMenuItem>
                        <ContextualMenuItem onClick={handleDeleteEnvironment}>Slett</ContextualMenuItem>
                    </ContextualMenu>
                </div>
            </div>
            <div className="mt-24 flex gap-24 flex-col">
                  <div className="text-base flex flex-col gap-4">
                        <div>Sist oppdatert: {format(new Date(environment.updated), "dd-MM-yyyy HH:mm")}</div>
                        <div>Opprettet: {format(new Date(environment.created), "dd-MM-yyyy HH:mm")}</div>
                        <div>Utløper: {format(new Date(environment.expires), "dd-MM-yyyy HH:mm")}</div>
                        {fipAppUrl && (
                            <>
                                <dt>FIP-miljø</dt>
                                <dd>{getFipLabelByUrl(fipAppUrl)}</dd>
                            </>
                        )}
                </div>
                <div>
                    <ul className="flex flex-wrap gap-x-16 gap-y-8">
                        <li>
                            <DistributorLink
                                key={`test${environment.name}+${sb1LoginHost}}`}
                                density="compact"
                                href={createMockloginUrl("sb1", sb1LoginHost)}
                                distributor="sb1"
                            >
                                SpareBank 1
                            </DistributorLink>
                        </li>
                        <li>
                            <DistributorLink
                                key={`${environment.name}+${dnbLoginHost}}`}
                                density="compact"
                                href={createMockloginUrl("dnb", dnbLoginHost)}
                                distributor="dnb"
                            >
                                DNB
                            </DistributorLink>
                        </li>
                        <li>
                            <DistributorLink
                                key={`${environment.name}+${sb1LoginHost}+bankid`}
                                density="compact"
                                href={generateBankIdLoginHostUrl(getHost("sb1-kunde", loginAppHostUrls), sb1LoginHost)}
                                distributor="sb1"
                            >
                                SpareBank 1 (BankID)
                            </DistributorLink>
                        </li>
                        <li>
                            <DistributorLink
                                key={`${environment.name}+${dnbLoginHost}}+bankid`}
                                density="compact"
                                href={generateBankIdLoginHostUrl(getHost("dnb-kunde", loginAppHostUrls), dnbLoginHost)}
                                distributor="dnb"
                            >
                                DNB (BankID)
                            </DistributorLink>
                        </li>
                        <li>
                            <SecondaryButton
                                density="compact"
                                onClick={() => {
                                    dialogRef.current.show();
                                }}
                            >
                                Rådgiver login
                            </SecondaryButton>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-24 text-base items-center">
                    <a
                        href={generateSwaggerUrl(sb1LoginHost)}
                        className="jkl-nav-link inline-block"
                        rel="noreferrer"
                        target="_blank"
                    >
                        Swagger
                    </a>
                    {apiGwApp?.routes?.length ? (
                        <>
                            <br />
                            <a
                                href={apiGwApp.routes.at(0)?.host + "/gw/docs/swagger-ui/index.html"}
                                className="jkl-nav-link inline-block"
                                target="_blank"
                                rel="noreferrer"
                            >
                                API GW Swagger
                            </a>
                        </>
                    ) : null}
                    <br />
                    <a
                        href={generateHumioUrl(environment.name)}
                        className="jkl-nav-link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Humio
                    </a>
                    {environment.apps.every((app) => calculateAppReadiness(app.status)?.ready) ? (
                <SuccessTag className="ml-auto">{readinessString}</SuccessTag>
            ) : (
                <InfoTag className="ml-auto">{readinessString}</InfoTag>
            )}
                </div>
            </div>
            <Dialog
                dialogRef={(instanse) => {
                    dialogRef.current = instanse;
                }}
                onConfirm={() => {
                    dialogRef.current?.hide();
                }}
                onCancel={() => {
                    dialogRef.current?.hide();
                }}
                title={`Rådgiver login: ${environment.name}`}
            >
                <RadgiverLogin values={advisorHosts} />
            </Dialog>

            <Dialog
                title="JSON"
                dialogRef={(instance) => {
                    jsonDialogRef.current = instance;
                }}
                onConfirm={() => {
                    jsonDialogRef.current?.hide();
                }}
                onCancel={() => {
                    jsonDialogRef.current?.hide();
                }}
            >
                <PrimaryButton onClick={copyJsonToClipboard}>Kopier JSON</PrimaryButton>
                <pre className="bg-snohvit my-24 p-24 overflow-scroll overflow-y-hidden">
                    {JSON.stringify(environment, null, 2)}
                </pre>
                <PrimaryButton onClick={copyJsonToClipboard}>Kopier JSON</PrimaryButton>
            </Dialog>
            <Dialog
                dialogRef={(instance) => {
                    appDialogRef.current = instance;
                }}
                onConfirm={() => {
                    appDialogRef.current?.hide();
                }}
                onCancel={() => {
                    appDialogRef.current?.hide();
                }}
                title="Oversikt over tjenestene"
            >
                <dl className="flex flex-col gap-40">
                    {environment.apps.map((app) => {
                        const readiness = calculateAppReadiness(app.status);

                        if (!readiness) {
                            return null;
                        }

                        const readinessString = `${readiness.replicas}/${readiness.replicaTarget} kjører`;

                        return (
                            <div key={app.image}>
                                <h3 className="j-h4 mb-4">{app.name}</h3>
                                {readiness.ready ? (
                                    <SuccessTag>{readinessString}</SuccessTag>
                                ) : (
                                    <>
                                        <InfoTag>{readinessString}</InfoTag>
                                        <br />
                                        <span className="j-small">{app.status}</span>
                                    </>
                                )}
                                <ul>
                                    <li>
                                        <b>Image:</b> {app.image}
                                    </li>
                                    {Object.entries(app.annotations ?? {}).map(([annotation, value]) => (
                                        <li key={annotation}>
                                            <b>{annotation}:</b> {value}
                                        </li>
                                    ))}
                                    {(app.routes ?? []).map((route, index) => (
                                        <li key={route.host + index}>
                                            <b>route:</b> {route.host}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </dl>
            </Dialog>
        </section>
    );
};
