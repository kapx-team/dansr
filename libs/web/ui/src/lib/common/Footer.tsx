import { Logo, PageContainer } from "@dansr/common-ui/server";
import { cn } from "@dansr/common-utils";
import Link from "next/link";

type FooterProps = React.ComponentProps<"footer">;

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
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <Logo className="w-[180px]" />
                        <p>Guaranteed attention, verified responses.</p>
                    </div>

                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link href="/product">Product</Link>
                            </li>
                            <li>
                                <Link href="/journey">Journey</Link>
                            </li>
                            <li>
                                <Link href="/team">Team</Link>
                            </li>
                            <li>
                                <Link href="/spotlight">Spotlight</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <hr className="bg-white" />

                <p className="text-center">© dansr. All rights reserved.</p>
            </PageContainer>
        </footer>
    );
}
