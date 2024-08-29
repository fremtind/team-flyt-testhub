import { json, type ActionFunction } from "@remix-run/node";
import { ActionResponse, isResponseError } from "~/common/utils/response.server";
import type { TesthubResponseError } from "~/model/TesthubResponseError";
import { createEnvironment, createEnvironmentPayload, deleteEnvironment, parseFormData } from "~/services/environments";

export const action: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case "POST":
            return await handleCreateEnvironment(request);
        case "DELETE":
            return await handleDeleteEnvironment(request);
    }
};

const handleCreateEnvironment = async (request: Request) => {
    const parsedFormData = await parseFormData(request);

    if (parsedFormData.success === false) {
        const errors = parsedFormData.error.flatten().fieldErrors;
        return json(errors, { status: 400 });
    }

    const payload = createEnvironmentPayload(parsedFormData.data);

    try {
        const res = await createEnvironment(payload);

        return json(new ActionResponse({ data: res }));
    } catch (e) {
        if (isResponseError(e)) {
            const body: TesthubResponseError = await e.json();
            const response = new ActionResponse({
                error: {
                    message: "En feil oppstod i APIet: " + body.error,
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

const handleDeleteEnvironment = async (request: Request) => {
    const formData = await request.formData();
    const environmentName = formData.get("namespace");

    if (!environmentName) {
        return json("Missing environment name", { status: 400 });
    }

    try {
        // Du prøvde å få sletting til å fungere uten å kaste feil...
        const res = await deleteEnvironment(environmentName.toString());
        console.log(res);
    } catch (e) {
        console.log(e);
    }
    return json({});
};
