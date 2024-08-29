import type { LoaderFunctionArgs } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";
import { emitter } from "../services/emitter";
import { environmentDetailsStatus } from "../services/environmentCache";

export const loader = ({ request, params }: LoaderFunctionArgs) => {
    const branch = params["*"];

    if (!branch) {
        return null;
    }

    if (!environmentDetailsStatus.has(branch)) {
        environmentDetailsStatus.set(branch, []);
    }

    return eventStream(request.signal, (send) => {
        const handler = (message: string) => {
            send({ data: JSON.stringify(message) });
        };

        emitter.addListener(branch, handler);
        return () => {
            emitter.removeListener(branch, handler);
        };
    });
};
