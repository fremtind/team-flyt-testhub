import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getBranches } from "../../services/github";
import type { RepositoryWithBranch } from "./model";
import { services } from "./model";

const repos = services.map((service) => service.repository);

export const loader: LoaderFunction = async () => {
    const branchGetter = await Promise.all(
        repos.map((repo) => {
            return new Promise<RepositoryWithBranch>(async (resolve) => {
                const branches = await getBranches(repo);

                const filteredBranches = branches.filter((branch) => {
                    return !branch.name.includes("dependabot");
                });

                const data = {
                    repo,
                    branches: filteredBranches,
                };

                resolve(data);
            });
        })
    );

    return json({
        repositories: branchGetter,
    });
};
