import { useRef, useState } from "react";
import { EnvironmentListResponse, EnvironmentStatusResponse } from "~/model/gen";
import { EnvironmentSection } from "~/components/EnvironmentSection";
import { ModalInstance } from "@fremtind/jkl-modal-react";

interface Props {
    projects?: Array<string>;
    mockLogin: {
        sb1: string;
        dnb: string;
    };
    props?: EnvironmentListResponse;
    data: Array<EnvironmentStatusResponse>;
}

export const View = (props: Props) => {
    return (
        <div>
            <div className="mb-40">
                {props.data.map((env, index) => (
                    <EnvironmentSection
                        environment={env.environment}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};
