const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
        ),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {
            colors: {
                primary: { 1: "#319795", 2: "#2C7A7B", 3: "#234E52" },
                dark: {
                    1: "#19203A",
                    2: "#242E47",
                    3: "#2A4365",
                },
                success: "#38A169",
            },
            fontFamily: {
                heading: "var(--font-inter)",
                body: "var(--font-karla)",
                inter: "var(--font-inter)",
                ibrand: "var(--font-ibrand)",
            },
        },
    },
    plugins: [],
};
