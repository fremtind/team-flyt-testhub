import type { BranchListResponse } from "../model/github";
import { githubApi } from "./fetcher";

const OWNER = "fremtind";

export const getBranches = async (repository: string) => {
    return githubApi.get<BranchListResponse>(`branches?owner=${OWNER}&repo=${repository}`);
};

const createBranchFetcher = (project: string) => {
    return getBranches(project).then((b) => b.map((branch) => ({ ...branch, project })));
};

export const getBranchesForMultipleRepositories = async (repositories: string[]) => {
    const promises = repositories.map((repository) => createBranchFetcher(repository));
    return Promise.all(promises);
};

export const getCommits = async(repository: string, limit = 10) => {
    return githubApi.get(`commits?owner=${OWNER}&repo=${repository}&limit=${limit}`);
};
