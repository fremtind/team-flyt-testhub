import type { Density } from "@fremtind/jkl-core";
import type { FunctionComponent, PropsWithChildren } from "react";
import type { Distributor } from "~/model/Distributor";

interface Props {
    distributor: Distributor;
    href: string;
    density?: Density;
}

export const DistributorLink: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const BaseLink = ({ className }: { className: string }) => (
        <a
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`jkl-button jkl-button--primary ${className}`}
            data-density={props.density}
        >
            {props.children}
        </a>
    );

    switch (props.distributor) {
        case "sb1":
            return <BaseLink className={`bg-sb1-fjell hover:bg-sb1-vann focus:bg-sb1-vann border-0`} />;
        case "dnb":
            return (
                <BaseLink
                    className={`bg-dnb-sea-green hover:bg-hvit hover:text-dnb-sea-green focus:bg-hvit border-0`}
                />
            );
    }
};
