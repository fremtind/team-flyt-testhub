import { defer } from "@remix-run/node";
import { getJiraIssueFromString } from "../../common/utils/jira";
import { getEnvironments } from "../../services/environments";
import { getBranchesForMultipleRepositories } from "../../services/github";
import type { TicketWithEnvironment } from "./model";
import { getIssuesFromColumn } from "~/services/jira";

export const loader = async () => {
    const dataFetcher = new Promise<{ projects: string[]; ticketCollection: TicketWithEnvironment[] }>(
        async (resolve) => {
            const ticketStatus = ["Klar for test"];

            const tickets = await getIssuesFromColumn(ticketStatus[0]);

            const ticketCollection: Array<TicketWithEnvironment> = tickets.map((ticket) => ({
                ticket,
                environments: []
            }));

            const devEnvironments = await getEnvironments();

            devEnvironments.devnamespaces.forEach((env) => {
                if (!env.appAnnotations) {
                    return;
                }

                Object.entries(env.appAnnotations).forEach(([appName, annotations]) => {
                    if (!annotations.branch || !annotations.branch.includes("main")) {
                        return;
                    }

                    const branchName = annotations.branch;

                    const branchIndex = ticketCollection.findIndex(
                        (ticket) => ticket.ticket.id === branchName
                    );

                    if (branchIndex === -1) {
                        return;
                    }

                    ticketCollection[branchIndex].environments.push(env);
                });
            });

            const projects = [...new Set(ticketCollection.map((project) => project.ticket.id))];
            resolve({ projects, ticketCollection: ticketCollection });
        }
    );

    return defer({ branchData: dataFetcher });
};
