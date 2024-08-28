import { head } from "lodash";
import { getRequiredEnvVar } from "~/common/utils/env.server";

class Fetcher {
    private readonly baseUrl: string;
    private readonly defaultHeaders: HeadersInit = {
        Accept: "application/json",
    };

    constructor(baseUrl: string, defaultHeaders?: HeadersInit) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = { ...this.defaultHeaders, ...defaultHeaders };
    }

    private executeRequest = async <T>(request: Request) => {
        return fetch(request).then<Promise<T>>(async (response) => {
            if (!response.ok) {
                const responsePayload = await response.text();
                console.error("An error occured fetching remote data", response, responsePayload);
                throw new Response(responsePayload, { status: response.status });
            }

            const resType = response.headers.get("Content-Type");

            if (resType?.includes("application/json")) {
                return await response.json();
            } else {
                return response.text();
            }
        });
    };

    public get = async <T>(url: string): Promise<T> => {
        const requestArgs: RequestInit = {
            method: "GET",
            headers: { ...this.defaultHeaders },
        };

        const request = this.createRequest(url, requestArgs);
        return this.executeRequest<T>(request);
    };

    public post = async <Response, Body>(url: string, body: Body): Promise<Response> => {
        const requestArgs: RequestInit = {
            method: "POST",
            headers: { ...this.defaultHeaders, "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };

        const request = this.createRequest(url, requestArgs);
        return this.executeRequest<Response>(request);
    };

    public delete = async <T>(url: string): Promise<T> => {
        const requestArgs: RequestInit = {
            method: "DELETE",
            headers: { ...this.defaultHeaders },
        };

        const request = this.createRequest(url, requestArgs);
        return this.executeRequest<T>(request);
    };

    private createRequest = (path: string, requestArgs: RequestInit) => {
        const urlWithHost = new URL(`${this.baseUrl}/${path}`);
        return new Request(urlWithHost, requestArgs);
    };
}

export const testhubApi = new Fetcher(getRequiredEnvVar("TESTHUB_API_PATH"));
export const githubApi = new Fetcher(getRequiredEnvVar("GITHUB_API_PATH"));
export const jiraApi = new Fetcher(getRequiredEnvVar("JIRA_API_PATH"), {
    Authorization: `Basic ${getRequiredEnvVar("JIRA_API_TOKEN")}`,
});
export const testLoginApi = new Fetcher(getRequiredEnvVar("TESTLOGIN_API_PATH"));
