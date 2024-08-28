import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import tailwindStyles from "./tailwind.css";
import breadcrumbStyles from "@fremtind/jkl-breadcrumb/breadcrumb.min.css";
import buttonStyles from "@fremtind/jkl-button/button.min.css";
import cardStyles from "@fremtind/jkl-card/card.min.css";
import checkboxStyles from "@fremtind/jkl-checkbox/checkbox.min.css";
import contentToggleStyles from "@fremtind/jkl-content-toggle/content-toggle.min.css";
import contextualMenuStyles from "@fremtind/jkl-contextual-menu/contextual-menu.min.css";
import coreStyles from "@fremtind/jkl-core/core.min.css";
import expandButtonStyles from "@fremtind/jkl-expand-button/expand-button.min.css";
import iconButtonStyles from "@fremtind/jkl-icon-button/icon-button.min.css";
import iconStyles from "@fremtind/jkl-icons/icons.min.css";
import inputGroupStyles from "@fremtind/jkl-input-group/input-group.min.css";
import imageStyles from "@fremtind/jkl-image/image.min.css";
import listStyles from "@fremtind/jkl-list/list.min.css";
import loaderStyles from "@fremtind/jkl-loader/loader.min.css";
import messageboxStyles from "@fremtind/jkl-message-box/message-box.min.css";
import selectStyles from "@fremtind/jkl-select/select.min.css";
import tabStyles from "@fremtind/jkl-tabs/tabs.min.css";
import tagStyles from "@fremtind/jkl-tag/tag.min.css";
import textInputStyles from "@fremtind/jkl-text-input/text-input.min.css";
import toastStyles from "@fremtind/jkl-toast/toast.min.css";
import toggleStyles from "@fremtind/jkl-toggle-switch/toggle-switch.min.css";
import tooltipStyles from "@fremtind/jkl-tooltip/tooltip.min.css";
import webfontStyles from "@fremtind/jkl-webfonts/webfonts.min.css";
import { ToastProvider } from "@fremtind/jkl-toast-react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const jklStyles = [
    breadcrumbStyles,
    buttonStyles,
    cardStyles,
    checkboxStyles,
    contentToggleStyles,
    contextualMenuStyles,
    coreStyles,
    expandButtonStyles,
    iconButtonStyles,
    iconStyles,
    inputGroupStyles,
    imageStyles,
    loaderStyles,
    listStyles,
    messageboxStyles,
    selectStyles,
    tabStyles,
    tagStyles,
    textInputStyles,
    toastStyles,
    toggleStyles,
    tooltipStyles,
    webfontStyles,
];

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    ...jklStyles.map((style) => ({ rel: "stylesheet", href: style })),
    {
        rel: "stylesheet",
        href: tailwindStyles,
    },
];

export default function App() {
    return (
        <html lang="no">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="jkl min-h-screen flex bg-sand" data-theme="light">
                <div className="flex flex-1 flex-col">
                    <Header />
                    <div className="px-24 flex-1">
                        <ToastProvider>
                            <Outlet />
                        </ToastProvider>
                    </div>

                    <Footer />
                </div>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}