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
    images: {
        remotePatterns: [
            {
                hostname: "caqcafjuyryxpnfrefhq.supabase.co",
            },
            {
                hostname: "macnsmhetvwfwpzfumho.supabase.co",
            },
            {
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/ingest/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/ingest/:path*",
                destination: "https://us.i.posthog.com/:path*",
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/qr",
                destination: "https://dansr.io",
                permanent: true,
            },
            {
                source: "/deck",
                destination:
                    "https://www.canva.com/design/DAGSVB43cAw/xE2ElNSJnRTNYAJAKQlZPg/view",
                permanent: true,
            },
            {
                source: "/pitch-video",
                destination:
                    "https://storage.googleapis.com/dansr/assets/pitch-video.mp4",
                permanent: true,
            },
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,
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
