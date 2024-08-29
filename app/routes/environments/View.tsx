import { useRef, useState } from "react";
import { EnvironmentListResponse, EnvironmentStatusResponse } from "~/model/gen";
import { EnvironmentSection } from "~/components/EnvironmentSection";
import { UserSelect } from "~/components/UserSelect";
import { defaultUser } from "../../components/UserSelect/UserSelect";
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
    const [selectedUser, setSelectedUser] = useState(defaultUser.fodselsnummer);

    return (
        <div>
            <div className="mb-40 flex justify-between">
                <UserSelect value={selectedUser} onChange={setSelectedUser} />
            </div>
            <div className="mb-40">
                {props.data.map((env, index) => (
                    <EnvironmentSection
                        environment={env.environment}
                        mocklogin={props.mockLogin}
                        selectedUser={selectedUser}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};
