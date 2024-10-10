export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="w-full flex flex-col items-center">{children}</div>;
}
