import { Logo } from "@dansr/common-ui/server";

export function Header() {
    return (
        <header className="flex justify-center items-center py-7">
            <Logo />
        </header>
    );
}

export default Header;
