import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { TextInput } from "@fremtind/jkl-text-input-react";
import { PrimaryButton } from "@fremtind/jkl-button-react";
import type { ActionResponse } from "../../common/utils/response.server";
import type { EnvironmentStatusResponse } from "../../model/gen";
import { getFieldErrorFromActionData } from "../../common/utils/formdata";
import { useRef, useState } from "react";
import { ErrorMessageBox, SuccessMessageBox } from "@fremtind/jkl-message-box-react";
import { NativeSelect, Select } from "@fremtind/jkl-select-react";
import type { RepositoryWithBranch } from "./model";
import { services } from "./model";
import { fipMap } from "~/common/utils/fip";
export { action } from "./action";
export { loader } from "./loader";

interface LoaderData {
    repositories: Array<RepositoryWithBranch>;
}

const NewCustomEnvironment = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const actionData = useActionData<ActionResponse<EnvironmentStatusResponse>>();
    const contextRef = useRef<HTMLInputElement>(null);
    const [contextError, setContextError] = useState("");
    const [didSubmit, setDidSubmit] = useState(false);
    const loaderData = useLoaderData<LoaderData>();

    const getBranches = (repo: string) => {
        return loaderData.repositories.find(({ repo: r }) => r === repo)?.branches ?? [];
    };

    return (
        <>
            <main className="container mx-auto">
                <h2 className="j-h2 mb-40">Lag nytt miljø</h2>
                <Form
                    method="POST"
                    className="max-w-3xl"
                    noValidate
                    onSubmit={(e) => {
                        setDidSubmit(false);
                        if (!contextRef.current?.validity.valid) {
                            e.preventDefault();
                            setContextError("Du må gi miljøet et navn");
                            return;
                        }

                        setDidSubmit(true);
                    }}
                >
                    <fieldset className="mb-40">
                        <h3 className="j-h4 mb-16">Grunnleggende</h3>
                        <div className="grid grid-cols-2 gap-x-40 gap-y-24">
                            <TextInput label="Prosjektnavn" name="context" required errorLabel={contextError} />
                            <TextInput
                                label="Levetid i timer"
                                type="number"
                                name="hoursToLive"
                                ref={contextRef}
                                defaultValue={10}
                                errorLabel={actionData?.error?.["hoursToLive"]?.[0]}
                            />
                            <NativeSelect
                                items={Object.keys(fipMap)}
                                label="FIP Miljø"
                                name="fip"
                                errorLabel={actionData?.error?.["fip"]?.[0]}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <h3 className="j-h4 mb-16">BM</h3>
                        <div className="grid grid-cols-2 gap-x-40 gap-y-24">
                            {services.map((input) => (
                                <Select
                                    key={input.inputName}
                                    label={input.label}
                                    name={input.inputName}
                                    defaultPrompt={
                                        getBranches(input.repository).find(({ name }) => name === "main")?.name ??
                                        "Velg"
                                    }
                                    errorLabel={getFieldErrorFromActionData(actionData, input.inputName)}
                                    searchable={true}
                                    items={getBranches(input.repository).map((branch) => ({
                                        label: branch.name,
                                        value: `${branch.name};${branch.commit.sha}`,
                                    }))}
                                />
                            ))}
                        </div>
                    </fieldset>
                    {actionData?.error?.message && didSubmit && (
                        <ErrorMessageBox fullWidth className="mt-24">
                            {actionData.error.message}
                        </ErrorMessageBox>
                    )}

                    {actionData?.data?.environment.name && (
                        <SuccessMessageBox className="mt-24">
                            Prosjektet er opprettet.
                            <br />
                            <Link to={`/`} className="jkl-link">
                                Gå tilbake til forsiden
                            </Link>
                        </SuccessMessageBox>
                    )}

                    <div className="mt-24">
                        <PrimaryButton loader={{ showLoader: isSubmitting, textDescription: "Oppretter miljø" }}>
                            Opprett miljø
                        </PrimaryButton>
                    </div>
                </Form>
            </main>
        </>
    );
};

export default NewCustomEnvironment;
