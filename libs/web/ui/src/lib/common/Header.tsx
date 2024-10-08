import { Button } from "@dansr/common-ui";
import { Logo } from "@dansr/common-ui/server";

export function Header() {
    return (
        <header className="flex justify-between items-center py-7 px-6">
            <Logo />

            <Button link="/auth">Go to App</Button>
        </header>
    );
}

export default Header;
