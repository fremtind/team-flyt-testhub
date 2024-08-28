import type { ActionError } from "../../model/ActionResponse";

export const isResponseError = (response: any): response is Response => {
    if (response instanceof Response) {
        return true;
    }

    return false;
};

export class ActionResponse<Data = any> {
    public data?: Data;
    public error?: ActionError;

    constructor({ data, error }: { data?: Data; error?: ActionError }) {
        this.data = data;
        this.error = error;
    }
}
