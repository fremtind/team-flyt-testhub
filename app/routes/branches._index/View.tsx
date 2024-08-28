import { useState } from "react";
import { Link } from "@remix-run/react";
import { CloseIcon } from "@fremtind/jkl-icons-react";
import { SuccessTag } from "@fremtind/jkl-tag-react";
import { TextInput } from "@fremtind/jkl-text-input-react";
import { ToggleSwitch } from "@fremtind/jkl-toggle-switch-react";
import type { BranchWithEnvironments } from "./model";
import { Select } from "@fremtind/jkl-select-react";
import { Loader } from "@fremtind/jkl-loader-react";
import "./View.css";

interface Props {
    collection: Array<BranchWithEnvironments>;
    projects: Array<string>;
}

const PROJECT_FILTER_DEFAULT = "Vis alle";

export const View = (props: Props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState(PROJECT_FILTER_DEFAULT);
    const [onlyActive, setOnlyActive] = useState(false);

    const filteredBranches = props.collection
        .filter((env) => {
            if (!selectedProject || selectedProject === PROJECT_FILTER_DEFAULT) {
                return true;
            }

            return env.branch.project === selectedProject;
        })
        .filter((env) => {
            return (
                env.branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                env.environments
                    .map((e) => e.name)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
        })
        .filter((env) => {
            if (!onlyActive) {
                return true;
            }

            return env.environments.length;
        });
    const sortedBranches = filteredBranches.sort((a, b) => {
        return a.branch.name.localeCompare(b.branch.name);
    });

    return (
        <>
            <div className="flex gap-40 mb-40 items-end">
                <TextInput
                    label="Søk etter branch eller miljø"
                    placeholder="Søk"
                    width="100%"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    action={{ icon: <CloseIcon />, label: "Tøm", onClick: () => setSearchQuery("") }}
                    className="flex-1"
                />
                <Select
                    label="Velg prosjekt"
                    items={[PROJECT_FILTER_DEFAULT, ...props.projects]}
                    name="project"
                    onChange={(e) => setSelectedProject(e.target.value)}
                    value={selectedProject}
                />
                <ToggleSwitch onChange={(e, pressed) => setOnlyActive(pressed)}>Kun aktive miljø</ToggleSwitch>
            </div>
            <ul>
                {sortedBranches.map((env) => (
                    <li key={env.branch.name + env.branch.project} className="mb-12">
                        <Link
                            to={`${env.branch.project}/${env.branch.name}`}
                            className="jkl-nav-card p-24"
                            prefetch="intent"
                            onClick={(e) => {
                                e.currentTarget.classList.add("jkl-nav-card--loading");
                            }}
                        >
                            <div className="flex flex-wrap justify-between items-center">
                                <div className="jkl-nav-card__content flex-col gap-0">
                                    <h3 className="jkl-nav-card__link">{env.branch.name}</h3>

                                    <div className="flex">
                                        <p className="text-stein j-small">{env.branch.project}</p>
                                    </div>
                                </div>
                                <Loader
                                    className="hidden"
                                    inline
                                    variant="large"
                                    textDescription="Laster lenke"
                                ></Loader>
                                {env.environments.length > 0 && (
                                    <SuccessTag className="ml-12">{env.environments.length} miljø</SuccessTag>
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};
