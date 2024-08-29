import { json } from "@remix-run/node";
import { getAccessToken } from "~/services/testlogin";

export const loader = async () => {
    const accessToken = await getAccessToken();
    return json(accessToken);
};
