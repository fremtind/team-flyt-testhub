export const Footer = () => {
    return (
        <footer className="mt-64 p-24 bg-hvit">
            <div className="container flex gap-64 mx-auto">
                <section>
                    <h2 className="jkl-heading-2 mb-8">Test</h2>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://forsikring-bm.app.fremtind-test-app.devaws.sparebank1.no/bedrift/login"
                                rel="noreferrer"
                            >
                                SpareBank 1
                            </a>
                        </li>
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://forsikring-bm.app.devaws.fremtind.no/bedrift/login"
                                rel="noreferrer"
                            >
                                Fremtind
                            </a>
                        </li>
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://forsikring-bm.app.devaws.dnbforsikring.no/bedrift/login"
                                rel="noreferrer"
                            >
                                DNB
                            </a>
                        </li>
                        <li className="mt-16">
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://humio.intern.sparebank1.no/forsikring-test/search?query=%22k8s_namespace%22%20%3D%20%22forsikring-bm-web-test%22&live=false&start=30d&fullscreen=false"
                                rel="noreferrer"
                            >
                                Humio
                            </a>
                        </li>
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://bmkundesok-01.test.sparebank1.no/"
                                rel="noreferrer"
                            >
                                Kundesøk
                            </a>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2 className="jkl-heading-2 mb-8">QA</h2>
                    <ul className="flex flex-col gap-8">
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://forsikring-bedrift.qa.sparebank1.no/"
                                rel="noreferrer"
                            >
                                SpareBank 1
                            </a>
                        </li>
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://www.qa.dnbforsikring.no/bedrift/"
                                rel="noreferrer"
                            >
                                DNB
                            </a>
                        </li>
                        <li className="mt-32">
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://humio.intern.sparebank1.no/forsikring-test/search?query=%22k8s_namespace%22%20%3D%20%22forsikring-bm-web-test%22&live=false&start=30d&fullscreen=false"
                                rel="noreferrer"
                            >
                                Humio
                            </a>
                        </li>
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://bmkundesok.qa.fremtind.no/"
                                rel="noreferrer"
                            >
                                Kundesøk
                            </a>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2 className="jkl-heading-2 mb-8">Prod</h2>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://forsikring-bedrift.sparebank1.no/"
                                rel="noreferrer"
                            >
                                SpareBank 1
                            </a>
                        </li>
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://www.dnbforsikring.no/bedrift/"
                                rel="noreferrer"
                            >
                                DNB
                            </a>
                        </li>
                        <li className="mt-40">
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://humio.intern.sparebank1.no/forsikring-bm-web-prod/search"
                                rel="noreferrer"
                            >
                                Humio
                            </a>
                        </li>
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://bmkundesok.intern.fremtind.no/"
                                rel="noreferrer"
                            >
                                Kundesøk
                            </a>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2 className="jkl-heading-2 mb-8">Nettbank SB1 SMN</h2>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://www.test.sparebank1.no/nb/smn/bedrift.html"
                                rel="noreferrer"
                            >
                                Test
                            </a>
                        </li>
                        <li>
                            <a
                                className="jkl-link"
                                target="_blank"
                                href="https://www.qa.sparebank1.no/nb/smn/bedrift/innlogging.html"
                                rel="noreferrer"
                            >
                                QA
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </footer>
    );
};
