import { ActionError } from "./ActionResponse";

export interface TesthubResponseError {
    timestamp: string;
    status: number;
    details: string;
    path: string;
    error?: ActionError | undefined;
}
