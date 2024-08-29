import { useEffect, useMemo, useRef, useState } from "react";
import { PrimaryButton, TertiaryButton } from "@fremtind/jkl-button-react";
import { NavTabs } from "@fremtind/jkl-tabs-react";
import { NavLink, useFetcher } from "@remix-run/react";
import { Modal } from "../Modal";
import { Dialog } from "../Dialog";
import { availableUsers } from "../../model/local/availableUsers";
import { ModalInstance } from "@fremtind/jkl-modal-react";
import { addSeconds, format, isSameDay } from "date-fns";
import { CopyIcon } from "@fremtind/jkl-icons-react";
import "@fremtind/jkl-modal/modal.min.css";
import "@fremtind/jkl-icon-button/icon-button.min.css";
import "@fremtind/jkl-icons/icons.min.css";
import "./Header.css";

const copyJsonToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
};

export const Header = () => {
    const dialogRef = useRef<ModalInstance | null>();
    const [showAccessTokenModal, setShowAccessTokenModal] = useState(false);
    const accessTokenFetcher = useFetcher();
    const { load, data } = accessTokenFetcher;
    const tokenExpirationDate = useMemo(() => {
        if (!data) {
            return undefined;
        }

        return addSeconds(new Date(), data.expires_in);
    }, [data]);
    useEffect(() => {
        if (showAccessTokenModal) {
            load("/api/access-token");
        }
    }, [showAccessTokenModal, load]);

    return (
        <>
            <header className="mb-40 px-24 pt-24 bg-hvit relative">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <h1 className="j-h1 mb-32">Team Flyt Testhub</h1>
                        
                    </div>

                    <NavTabs>
                        <NavLink to="/" className="jkl-tab" role="tab">
                            Brancher
                        </NavLink>
                        <NavLink to="/environments" className="jkl-tab" role="tab" prefetch="render">
                            Miljøer
                        </NavLink>
                        <NavLink to="/new" className="jkl-tab" role="tab">
                            Nytt miljø
                        </NavLink>
                    </NavTabs>

                    <div className="absolute bottom-0 right-0 left-0 border-b  border-b-varde" />
                </div>
            </header>
            <Modal isOpen={showAccessTokenModal} onClose={() => setShowAccessTokenModal(false)} header="Access token">
                {data?.access_token ? (
                    <>
                        {tokenExpirationDate && (
                            <p>
                                Token utløper{" "}
                                {isSameDay(new Date(), tokenExpirationDate)
                                    ? `kl. ${format(tokenExpirationDate, "HH:mm:ss")}`
                                    : format(tokenExpirationDate, "dd-MM-yyyy HH:mm:ss")}
                            </p>
                        )}

                        <pre className="truncate bg-varde py-4 px-12 mt-24 max-w-3xl rounded">{data.access_token}</pre>
                        <div className="flex justify-between mt-16">
                            <PrimaryButton onClick={() => copyJsonToClipboard(data.access_token)}>
                                Kopier token
                            </PrimaryButton>
                            <TertiaryButton onClick={() => load("/api/access-token")}>Hent nytt token</TertiaryButton>
                        </div>
                    </>
                ) : (
                    <p>Henter token...</p>
                )}
            </Modal>
            <Dialog
                title="Tilgjengelige brukere"
                dialogRef={(instance) => {
                    dialogRef.current = instance;
                }}
                onConfirm={() => {
                    console.log("? Confirm");
                    dialogRef.current?.hide();
                }}
                onCancel={() => {
                    console.log("? Cancel");
                    dialogRef.current?.hide();
                }}
            >
                <ul className="flex flex-row flex-wrap flex justify-between text-slate-50 items-center py-40">
                    {availableUsers.map((user) => (
                        <li className="user-list flex flex-row w-full items-center p-40" key={user.fodselsnummer}>
                            <div className="flex flex-col flex-1 items-start gap-4">
                                <span className="leading-[1] pt-12">
                                    {user.fornavn} {user.etternavn}
                                </span>
                                <TertiaryButton
                                    className="border-hidden font-normal"
                                    data-testid="copy-to-clipboard"
                                    onClick={() => copyJsonToClipboard(user.fodselsnummer)}
                                    title="Kopier til utklippstavle"
                                >
                                    <>
                                        {user.fodselsnummer}
                                        <CopyIcon />
                                        <span className="jkl-sr-only">Kopier til utklippstavle</span>
                                    </>
                                </TertiaryButton>
                            </div>
                            <NavLink
                                to={`https://forsikring-bm-testlogin.intern.app.devaws.fremtind.no/api/auth/access-token?subject=${user.fodselsnummer}`}
                                target="_blank"
                                rel="noreferrer"
                                className="jkl-button jkl-button--tertiary"
                            >
                                Access token
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </Dialog>
        </>
    );
};
