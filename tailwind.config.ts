import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import type { responsiveToken } from "./jokul-tokens";
import tokens from "./jokul-tokens";
import { breakpoints } from "@fremtind/jkl-core";

const responsiveTokenToCssInJss = (rule: responsiveToken) => ({
    ...rule.small,
    [`@media (min-width: ${breakpoints.medium}px)`]: {
        ...rule.base,
    },
});

const convertTokenToCssInJss = (token: Record<string, any>) =>
    Object.fromEntries(Object.entries(token).map(([key, value]) => [`.j-${key}`, responsiveTokenToCssInJss(value)]));

const { body, h1, h2, h3, h4, h5, small, title, titleSmall } = tokens.typography;

const typographyTokens = convertTokenToCssInJss({ body, h1, h2, h3, h4, h5, small, title, titleSmall });

export default {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            ...tokens.color,
            sb1: {
                fjell: "#005AA4",
                vann: "#002776",
            },
            "dnb": {
                "sea-green": "#007272",
            }
        },
        spacing: tokens.spacing,
        fontSize: tokens.typography.font.size,
        lineHeight: tokens.typography.line.height,
        fontweight: tokens.typography.weight,
    },
    plugins: [
        plugin(function ({ addComponents }) {
            addComponents(typographyTokens);
        }),
    ],
} satisfies Config;
