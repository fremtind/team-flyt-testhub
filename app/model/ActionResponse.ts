type FieldError = Record<string, Array<string>>;
export interface ActionError {
    fieldError?: FieldError;
    message?: string;
}
