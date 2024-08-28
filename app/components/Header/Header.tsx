import { NavTabs } from "@fremtind/jkl-tabs-react";
import { NavLink } from "@remix-run/react";
import "@fremtind/jkl-modal/modal.min.css";
import "@fremtind/jkl-icon-button/icon-button.min.css";
import "@fremtind/jkl-icons/icons.min.css";
import "./Header.css";


export const Header = () => {
    return (
        <>
            <header className="mb-40 px-24 pt-24 bg-hvit relative">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <h1 className="j-h1 mb-32">Flyt Testhub</h1>
                    </div>
                </div>
                <NavTabs>
                    <NavLink to="/branches" className="jkl-tab" role="tab">
                        Brancher
                    </NavLink>
                    <NavLink to="/environments" className="jkl-tab" role="tab" prefetch="render">
                        Miljøer
                    </NavLink>
                </NavTabs>
                <div className="absolute bottom-0 right-0 left-0 border-b  border-b-varde" />
            </header>
    
        </>
    );
};
