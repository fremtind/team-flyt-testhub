export const getFormDataFromRequest = async (request: Request) => {
    const formData = Object.fromEntries(await request.formData());
    return formData;
};

export const removeEmptyFields = (obj: object) => {
    const filteredFormData = Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== ""));
    return filteredFormData;
};

export const getFieldErrorFromActionData = (actionData: any | undefined, field: string) => {
    if (actionData?.error?.fieldError?.length) {
        const fieldError = actionData.error.fieldError[field]?.[0];
        return fieldError;
    }

    return undefined;
};
