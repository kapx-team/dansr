import { Logo, PageContainer } from "@dansr/common-ui/server";
import { cn } from "@dansr/common-utils";
import Link from "next/link";

type FooterProps = React.ComponentProps<"footer">;

const NAV_LINKS = [
    {
        href: "/#team-section",
        label: "Team",
    },
    {
        href: "/#advisor-section",
        label: "Advisors",
    },
];

export function Footer({ className, ...props }: FooterProps) {
    return (
        <footer
            className={cn(
                "flex bg-gradient-primary font-medium font-body items-center justify-center pt-2",
                className
            )}
            {...props}
        >
            <PageContainer className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between text-center md:text-left md:items-start items-center gap-6">
                    <div className="space-y-3 flex flex-col items-center md:items-start">
                        <Logo className="w-[180px]" />
                        <p>Guaranteed attention, verified responses.</p>
                    </div>

                    <nav>
                        <ul className="flex flex-col md:flex-row gap-3 md:gap-6">
                            {NAV_LINKS.map((link) => {
                                return (
                                    <li
                                        key={link.label}
                                        className="hover:text-primary-2"
                                    >
                                        <Link href={link.href}>
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <hr className="bg-white" />

                <p className="text-center">© dansr. All rights reserved.</p>
            </PageContainer>
        </footer>
    );
}
