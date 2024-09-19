import { Providers, ToastNotificationDisplay } from "@dansr/common-ui";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";

// Font files can be colocated inside of `pages`

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});
const ibrand = localFont({
    src: "../public/fonts/Ibrand.woff2",
    variable: "--font-ibrand",
});
export const metadata = {
    title: "Dansr",
    description: "",
    icons: {
        icon: "/favicon.ico",
    },
    keywords: ["dansr", "solana"],
    openGraph: {
        images: ["https://dansr.io/images/dansr.png"],
        type: "website",
    },
    twitter: {
        images: ["https://dansr.io/images/dansr.png"],
        card: "summary_large_image",
    },
} satisfies Metadata;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body
                className={`${montserrat.variable} ${ibrand.variable} bg-primary-1 text-white`}
            >
                <Providers>{children}</Providers>

                <ToastNotificationDisplay />
            </body>
        </html>
    );
}
