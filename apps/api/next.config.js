//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },

    experimental: {
        serverMinification: false,
    },

    async rewrites() {
        return [{ source: "/:path*", destination: "/api/:path*" }];
    },

    async redirects() {
        return [{ source: "/", destination: "/v1", permanent: true }];
    },

    webpack: (config) => {
        config.externals.push("pino-pretty", "encoding");
        return config;
    },
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
