import { testLoginApi } from "./fetcher";

interface TestLoginResponse {
    scope: string;
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    "not-before-policy": number;
}

export const getAccessToken = async () => {
    return await testLoginApi.get<TestLoginResponse>("api/auth/access-token");
};
