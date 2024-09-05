import { Providers, ToastNotificationDisplay } from "@dansr/common-ui";

import type { Metadata } from "next";
import { Inter, Karla } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const karla = Karla({ variable: "--font-karla", subsets: ["latin"] });

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
                className={`${inter.variable} ${karla.variable} flex h-screen flex-col bg-dark-1 text-white`}
            >
                <Providers>{children}</Providers>

                <ToastNotificationDisplay />
            </body>
        </html>
    );
}
