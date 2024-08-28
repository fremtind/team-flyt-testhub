import { NavLink } from "@remix-run/react";
import type { NavLinkProps } from "@remix-run/react";

export const JklNavLink = ({className, ...props}: NavLinkProps) => {
    return (
        <NavLink {...props} className={({ isActive }) => `jkl-nav-link ${className ?? ""} ${isActive ? "jkl-nav-link--active" : ""}`} />
    );
};
