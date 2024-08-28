import type { SelectProps } from "@fremtind/jkl-select-react";
import { Select } from "@fremtind/jkl-select-react";

interface Props {
    onChange: (selectedUser: string) => void;
    value: string;
    className?: string;
    labelProps?: SelectProps["labelProps"];
    label?: string;
    density?: SelectProps["density"];
    width?: string;
}

export const UserSelect = ({ onChange, width = "400px", label = "Velg bruker", ...props }: Props) => {
    return (
        <Select
            {...props}
            label={label}
            name="fodselsnummer"
            items={users.map((user) => ({
                label: `${user.fornavn} ${user.etternavn}`,
                description: user.fodselsnummer,
                value: user.fodselsnummer,
            }))}
            width={width}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

const users = [
    { fodselsnummer: "24866798431", fornavn: "ELEGANT", etternavn: "FORMUE" },
    { fodselsnummer: "10840199849", fornavn: "ORANSJE", etternavn: "MATBOKS" },
    { fodselsnummer: "23837699061", fornavn: "UGLESETT", etternavn: "SERVISE" },
];

export const defaultUser = users[0];
