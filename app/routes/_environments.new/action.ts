import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { TesthubResponseError } from "../../model/TesthubResponseError";
import { isResponseError, ActionResponse } from "../../common/utils/response.server";
import { createEnvironment, createEnvironmentPayload, parseFormData } from "../../services/environments";

export const action: ActionFunction = async ({ request }) => {
    const parsedFormData = await parseFormData(request);

    if (parsedFormData.success === false) {
        const errors = parsedFormData.error.flatten().fieldErrors;
        return json({ error: errors }, { status: 400 });
    }

    const payload = createEnvironmentPayload(parsedFormData.data);
    if (!payload.context.startsWith("fbm")){
        payload.context = "fbm-"+payload.context
    }

    try {
        const res = await createEnvironment(payload);

        return json(new ActionResponse({ data: res }));
    } catch (e) {
        if (isResponseError(e)) {
            const body: TesthubResponseError = await e.json();
            const response = new ActionResponse({
                error: {
                    message: "En feil oppstod i APIet: " + body.details,
                },
            });

            return json(response, { status: e.status });
        }

        const response = new ActionResponse({
            error: {
                message: "En ukjent serverfeil oppstod",
            },
        });
        return json(response, { status: 500 });
    }
};
