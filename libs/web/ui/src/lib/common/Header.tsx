import { Button } from "@dansr/common-ui";
import { Logo, PageContainer } from "@dansr/common-ui/server";
import Link from "next/link";

export function Header() {
    return (
        <PageContainer>
            <header className="flex justify-between items-center">
                <Link href="/">
                    <Logo />
                </Link>

                <nav>
                    <ul className="flex gap-8">
                        <li className="hover:text-primary-2">
                            <Link href="#team-section">Team</Link>
                        </li>
                        <li className="hover:text-primary-2">
                            <Link href="#advisor-section">Advisors</Link>
                        </li>
                    </ul>
                </nav>

                <Button link="/auth">Get Started</Button>
            </header>
        </PageContainer>
    );
}

export default Header;
