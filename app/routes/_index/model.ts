import type { EnvironmentOverviewStatus } from "~/model/gen";

export interface TicketWithEnvironment {
    ticket: {
        id: string;
        title: string;
    };
    environments: Array<EnvironmentOverviewStatus>;
}
