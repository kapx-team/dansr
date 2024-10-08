const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
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
                primary: { 1: "#2D005D" },
                dark: {
                    1: "#19203A",
                    2: "#242E47",
                    3: "#2A4365",
                },
            },
            fontFamily: {
                heading: "var(--font-ibrand)",
                body: "var(--font-montserrat)",
                montserrat: "var(--font-montserrat)",
                ibrand: "var(--font-ibrand)",
            },
        },
    },
    plugins: [],
};
