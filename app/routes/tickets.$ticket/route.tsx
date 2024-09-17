import { useLoaderData, useParams } from "@remix-run/react";
import { EnvironmentSection } from "../../components/EnvironmentSection/EnvironmentSection";
import { NewEnvironmentButton } from "../../components/NewEnvironmentButton";
import type { LoaderData } from "./loader";
import { getIssue } from "~/services/jira";

export { action } from "./action";
export { loader } from "./loader";

const ProjectView = () => {
    const params = useParams<"ticket">();

    const loaderData = useLoaderData<LoaderData>();

    const data = loaderData.environments;

    const environmentsSortedByCreation = data.sort((a, b) => {
        const aCreatedDate = new Date(a.environment.created);
        const bCreatedDate = new Date(b.environment.created);

        return bCreatedDate.getTime() - aCreatedDate.getTime();
    });

    const environmentNames = environmentsSortedByCreation.map((env) => env.environment.name);

    const jiraIssue = params.ticket; //getIssue(params.branchName!);


    return (
        <>
            <main className="container mx-auto">
                <div className="flex mb-40 gap-x-16 flex-wrap">
                    <h2 className="j-h2 flex-1">{params.ticket}</h2>
                    {params.ticket && (
                        <NewEnvironmentButton
                            environmentNames={environmentNames}
                            project={params.ticket}
                            withModal={true}
                        />
                    )}
                    <div className="w-full">
                        {jiraIssue && (
                            <a
                                href={`https://fremtind.atlassian.net/browse/${jiraIssue}`}
                                target="_blank"
                                rel="noreferrer"
                                className="jkl-link mr-16"
                            >
                                JIRA task
                            </a>
                        )}
                    </div>
                </div>

                <section>
                    <h3 className="j-h4 mb-12">Tilgjengelige miljøer</h3>
                    {console.log("env", environmentsSortedByCreation)}
                    {environmentsSortedByCreation.length ? (
                        environmentsSortedByCreation.map((env, index) => (
                            <>
                                <EnvironmentSection
                                    environment={env.environment}
                                    key={index}
                                />
                            </>
                        ))
                    ) : (
                        <div className="j-h3 text-center bg-hvit border-dis border rounded-lg p-40 mb-32 max-w-5xl">
                            <svg
                                className="mx-auto mb-32"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_196_21350)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2 20C2 10.0589 10.0589 2 20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20ZM20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0ZM14.1665 13.75C14.1665 14.4404 13.6069 15 12.9165 15C12.2261 15 11.6665 14.4404 11.6665 13.75C11.6665 13.0596 12.2261 12.5 12.9165 12.5C13.6069 12.5 14.1665 13.0596 14.1665 13.75ZM27.0835 15C27.7739 15 28.3335 14.4404 28.3335 13.75C28.3335 13.0596 27.7739 12.5 27.0835 12.5C26.3931 12.5 25.8335 13.0596 25.8335 13.75C25.8335 14.4404 26.3931 15 27.0835 15ZM10 28.7499C10.8222 29.3191 10.822 29.3194 10.8218 29.3197L10.826 29.3138C10.8308 29.307 10.8392 29.2953 10.851 29.2791C10.8748 29.2466 10.9125 29.1959 10.9639 29.1296C11.0667 28.9969 11.2238 28.8022 11.4326 28.5661C11.8512 28.093 12.4723 27.4596 13.2751 26.8271C14.8868 25.5573 17.1742 24.3333 20 24.3333C22.8258 24.3333 25.1132 25.5573 26.7249 26.8271C27.5277 27.4596 28.1488 28.093 28.5674 28.5661C28.7762 28.8022 28.9333 28.9969 29.0361 29.1296C29.0875 29.1959 29.1252 29.2466 29.149 29.2791C29.1608 29.2953 29.1692 29.307 29.174 29.3138L29.1782 29.3197C29.178 29.3194 29.1778 29.3191 30 28.7499C30.8222 28.1807 30.822 28.1804 30.8217 28.18L30.8211 28.1792L30.8198 28.1772L30.8159 28.1717L30.8041 28.155C30.7943 28.1412 30.7809 28.1225 30.7638 28.0991C30.7295 28.0522 30.6806 27.9865 30.6172 27.9047C30.4905 27.7412 30.3058 27.5127 30.0654 27.241C29.5855 26.6985 28.8785 25.9777 27.9626 25.2561C26.1368 23.8176 23.4242 22.3333 20 22.3333C16.5758 22.3333 13.8632 23.8176 12.0374 25.2561C11.1215 25.9777 10.4145 26.6985 9.9346 27.241C9.6942 27.5127 9.50949 27.7412 9.38282 27.9047C9.31945 27.9865 9.27049 28.0522 9.23625 28.0991C9.21912 28.1225 9.20567 28.1412 9.19592 28.155L9.18407 28.1717L9.18024 28.1772L9.17885 28.1792L9.17828 28.18C9.17804 28.1804 9.17781 28.1807 10 28.7499Z"
                                        fill="#636060"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_196_21350">
                                        <rect width="40" height="40" rx="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Ingen miljøer enda <br />
                            {params.ticket && (
                                <NewEnvironmentButton
                                    project={params.ticket}
                                    density="comfortable"
                                    className="mt-12"
                                />
                            )}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default ProjectView;
