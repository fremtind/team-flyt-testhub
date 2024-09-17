import type { LoaderFunctionArgs } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";
import { emitter } from "../services/emitter";
import { environmentDetailsStatus } from "../services/environmentCache";

export const loader = ({ request, params }: LoaderFunctionArgs) => {
    const ticket = params["*"];

    if (!ticket) {
        return null;
    }

    if (!environmentDetailsStatus.has(ticket)) {
        environmentDetailsStatus.set(ticket, []);
    }

    return eventStream(request.signal, (send) => {
        const handler = (message: string) => {
            send({ data: JSON.stringify(message) });
        };

        emitter.addListener(ticket, handler);
        return () => {
            emitter.removeListener(ticket, handler);
        };
    });
};
