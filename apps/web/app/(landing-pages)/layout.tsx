import { Header } from "@dansr/web-ui/server";

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="w-full flex flex-grow flex-col items-center">
                {children}
            </div>
        </>
    );
}
