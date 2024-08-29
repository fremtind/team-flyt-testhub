export const availableUsers = [
    { fodselsnummer: "24866798431", fornavn: "ELEGANT", etternavn: "FORMUE" },
    { fodselsnummer: "10840199849", fornavn: "ORANSJE", etternavn: "MATBOKS" },
    { fodselsnummer: "23837699061", fornavn: "UGLESETT", etternavn: "SERVISE" },
] as const;

export type AvailableUserModel = {
    users: {
        fødselsnummer: string;
        fornavn: string;
        etternavn: string;
    }[];
};
