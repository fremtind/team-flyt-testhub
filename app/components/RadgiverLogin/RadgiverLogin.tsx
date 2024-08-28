import { PrimaryButton } from "@fremtind/jkl-button-react";
import type { SelectProps } from "@fremtind/jkl-select-react";
import { Select } from "@fremtind/jkl-select-react";
import { useState } from "react";
import { TextInput } from "@fremtind/jkl-text-input-react";
import { ToggleSlider } from "@fremtind/jkl-toggle-switch-react";
import "@fremtind/jkl-accordion/accordion.min.css";


const organisations = [
    { value: "978712967", description: "978712967", label: "ASTRA BYGG & ENTREPRENØR AS" },
    { value: "994469126", description: "994469126", label: "Epcon" },
    { value: "811141402", description: "811141402", label: "Damespesialen" },
    { value: "880522892", description: "880522892", label: "El og IT forbundet" },
    { value: "988210641", description: "988210641", label: "Right Price Tiles" },
    { value: "966322497", description: "966322497", label: "Carpe Diem" },
    { value: "923828494", description: "923828494", label: "Roberts Norge AS" },
    { value: "923794069", description: "923794069", label: "GARANTIMEGLEREN AS" },
    { value: "980378535", description: "980378535", label: "NARVESEN FORHANDLERFORENING" },
    { value: "915651232", description: "915651232", label: "Fremtind" },
];

interface Props {
    values: SelectProps["items"];
}

const FORHANDSVALGTE = "Forhåndsvalgte" as const;
const VELGSELV = "Velg selv" as const;
type SelectMethod = typeof FORHANDSVALGTE | typeof VELGSELV;

export const RadgiverLogin = (props: Props) => {
    const [orgNumber, setOrgNumber] = useState("");
    const [selectedDistributor, setSelectedDistributor] = useState(
        typeof props.values[0] === "object" ? props.values[0].value : props.values[0] ?? ""
    );
    const [selectMethod, setSelectMethod] = useState<SelectMethod>(FORHANDSVALGTE);

    return (
        <form
            action={`https://porten.test.sparebank1.no/?redirect=BM_KUNDELOSNINGER_RADGIVER_TEST&goto=${selectedDistributor}/bedrift/api/jumpsst`}
            method="POST"
            className="flex flex-wrap gap-40 flex-col"
            target="_blank"
        >
            <Select
                name="distributor"
                label="Velg distributør"
                items={props.values}
                value={selectedDistributor}
                onChange={(e) => setSelectedDistributor(e.target.value)}
            />

            <ToggleSlider
                labels={[FORHANDSVALGTE, VELGSELV]}
                density="compact"
                defaultValue={selectMethod}
                onToggle={(e) => setSelectMethod(e as SelectMethod)}
                className="-mb-24"
            >
                Hvordan vil du velge organisasjon?
            </ToggleSlider>
            {selectMethod === FORHANDSVALGTE ? (
                <Select name="organisasjonsnummer" items={organisations} label="Velg organisasjon" width="350px" />
            ) : (
                <TextInput
                    name="organisasjonsnummer"
                    placeholder="Organisasjonsnummer"
                    label="Velg organisasjon"
                    width="350px"
                    onChange={(e) => setOrgNumber(e.target.value)}
                    value={orgNumber.replace(/ /g, '')}

                />
            )}

            <div className="w-full">
                <PrimaryButton>Logg inn</PrimaryButton>
            </div>
        </form>
    );
};
