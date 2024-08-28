import { ErrorMessageBox } from "@fremtind/jkl-message-box-react";
import type { V2_MetaFunction } from "@remix-run/node";
import { Await, Link, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { Suspense } from "react";
import { loader } from "./loader";
import { View } from "./View";
import { Loader } from "@fremtind/jkl-loader-react";

export const meta: V2_MetaFunction = () => {
    return [{ title: "BM Test hub" }];
};

export { loader };

export default function BranchOverview() {
    const loaderData = useLoaderData<typeof loader>();

    return (
        <>
            <main className="flex flex-col container gap-40 mx-auto">
                <section>
                    <div className="mb-40 flex justify-between">
                        <h2 className="j-h2">Brancher</h2>

                        <Link to={`/new?`} data-density="compact" className="jkl-button jkl-button--secondary">
                            Nytt egendefinert miljø
                        </Link>
                    </div>
                    <Suspense
                        fallback={
                            <div className="flex items-center justify-center h-168">
                                <Loader textDescription="Henter brancher" />
                            </div>
                        }
                    >
                        <Await resolve={loaderData.branchData}>
                            {(data) => {
                                return <View collection={data.branchCollection} projects={data.projects} />;
                            }}
                        </Await>
                    </Suspense>
                </section>
            </main>
        </>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <>
                <header className="mb-64 mt-32">
                    <h1 className="j-h1">Bedriftsmarked Kundeløsninger</h1>
                </header>
                <main className="flex-1">
                    <ErrorMessageBox title={`${error.status} ${error.statusText}`}>{error.data.error}</ErrorMessageBox>
                </main>
            </>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}
