import { useEffect, useMemo, useRef, useState } from "react";
import { PrimaryButton, TertiaryButton } from "@fremtind/jkl-button-react";
import { NavTabs } from "@fremtind/jkl-tabs-react";
import { NavLink, useFetcher } from "@remix-run/react";
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
                            Tickets
                        </NavLink>
                        <NavLink to="/new" className="jkl-tab" role="tab">
                            Nytt miljø
                        </NavLink>
                        
                    </NavTabs>

                    <div className="absolute bottom-0 right-0 left-0 border-b  border-b-varde" />
                </div>
            </header>
        </>
    );
};
