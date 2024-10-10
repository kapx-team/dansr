import { Button } from "@dansr/common-ui";
import { Logo, PageContainer } from "@dansr/common-ui/server";

export function Header() {
    return (
        <PageContainer>
            <header className="flex justify-between items-center">
                <Logo />

                <Button link="/auth">Get Started</Button>
            </header>
        </PageContainer>
    );
}

export default Header;
