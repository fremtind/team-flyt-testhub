import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { PrimaryButton } from "@fremtind/jkl-button-react";
import { useNavigation, Form } from "@remix-run/react";
import { Modal } from "../Modal";
import { TextInput } from "@fremtind/jkl-text-input-react";
import type { FunctionComponent, PropsWithChildren } from "react";
import type { Density } from "@fremtind/jkl-core";
import { useEffect, useState } from "react";
import { useToast } from "@fremtind/jkl-toast-react";
import { Select } from "@fremtind/jkl-select-react";
import type { Fip } from "~/common/utils/fip";
import { fipMap } from "~/common/utils/fip";
import { toLower } from "lodash";

interface Props {
    project: string;
    withModal?: boolean;
    density?: Density;
    className?: string;
    environmentNames?: string[];
}

export const NewEnvironmentButton: FunctionComponent<PropsWithChildren<Props>> = ({
    project,
    withModal,
    children,
    className = "",
    density = "compact",
    environmentNames,
}) => {
    const navigation = useNavigation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFipEnvironment, setSelectedFipEnvironment] = useState<Fip>("FIP-01");
    const [envLenght, setEnvLength] = useState(environmentNames ? environmentNames?.length : 0);

    let environmentNameExists = false;

    const { add } = useToast();

    const nameGenConfig: Config = {
        dictionaries: [animals],
        separator: '-',
        length: 1,
      };

    const name = uniqueNamesGenerator(nameGenConfig);

    useEffect(() => {
        if (navigation.state === "loading" && isDialogOpen) {
            add("Miljø opprettet", { variant: "success", timeout: 7500 });
            setIsDialogOpen(false);
        }
        setEnvLength(environmentNames ? environmentNames?.length : 0);
    }, [navigation, add, isDialogOpen, environmentNames, envLenght]);
    const jiraTicket = toLower(project)
    const projectName = jiraTicket  + "-" + name;
    const splitEnvironments = environmentNames?.map((env) => env.split("-"));
    splitEnvironments?.forEach((env) => {
        env.pop();
        env.shift();
        const envName = env.join("-");
        if (envName?.includes(jiraTicket)) {
            environmentNameExists = true;
        }
    });

    if (!withModal) {
        return (
            <Form action="." method="POST">
                <TextInput
                    hidden
                    name="flyt-backend"
                    className="jkl-sr-only"
                    value={project}
                    readOnly
                    labelProps={{ srOnly: true }}
                    label="project"
                />

                <TextInput
                    hidden
                    name="context"
                    className="jkl-sr-only"
                    //  defaultValue={
                    //      jiraIssue
                    //         ? `${jiraIssue}-`
                    //          : environmentNameExists
                    //          ? `${branchName}-${envLenght + 1}`
                    //            : branchName
                    //   }
                    defaultValue={
                        environmentNameExists ? `${projectName}-${envLenght + 1}` : projectName
                    }
                    labelProps={{ srOnly: true }}
                    label="Miljønavn"
                />
                <TextInput hidden name="fip" labelProps={{ srOnly: true }} label="FIP-Miljø" readOnly value="FIP-01" />
                <PrimaryButton
                    loader={{ showLoader: navigation.state === "submitting", textDescription: "Oppretter miljø" }}
                    density={density}
                    className={className}
                >
                    {children ?? "Nytt miljø"}
                </PrimaryButton>
            </Form>
        );
    }

    return (
        <>
            <PrimaryButton
                loader={{ showLoader: navigation.state === "submitting", textDescription: "Oppretter miljø" }}
                onClick={() => {
                    setIsDialogOpen(true);
                }}
                density={density}
                className={className}
            >
                {children ?? "Nytt miljø"}
            </PrimaryButton>

            <Modal
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                style={{ width: "705px" }}
                header="Opprett nytt testmiljø"
            >
                <Form action="." method="POST">
                    <TextInput
                        label="Miljønavn"
                        name="context"
                        required
                        //defaultValue={jiraIssue ? `${jiraIssue}-` : ""}
                        //  defaultValue={
                        //   jiraIssue
                        //       ? `${jiraIssue}-`
                        //      : environmentNameExists
                        //        ? `${branchName}-${envLenght + 1}`
                        //        : branchName
                        //    }
                        defaultValue={
                            environmentNameExists ? `${projectName}-${envLenght + 1}` : projectName
                        }
                        className="mb-12"
                        autoFocus
                    />
                    <TextInput
                        hidden
                        name={project}
                        className="jkl-sr-only"
                        value={project}
                        readOnly
                        labelProps={{ srOnly: true }}
                        label="project"
                    />
                    <Select
                        items={Object.keys(fipMap)}
                        label="FIP Miljø"
                        name="fip"
                        className="mb-12"
                        onChange={(e) => setSelectedFipEnvironment(e.target.value as Fip)}
                        value={selectedFipEnvironment}
                    />
                    <PrimaryButton
                        loader={{ showLoader: navigation.state === "submitting", textDescription: "Oppretter miljø" }}
                    >
                        Opprett
                    </PrimaryButton>
                </Form>
            </Modal>
        </>
    );
};
