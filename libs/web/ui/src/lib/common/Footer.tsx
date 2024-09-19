import { Logo } from "@dansr/common-ui/server";

export function Footer() {
    return (
        <footer className="flex -space-x-4 font-medium font-body items-center justify-center p-8">
            <span>Copyright © 2024. All Rights Reserved by</span>
            <span>
                <Logo className="h-4" />
            </span>
        </footer>
    );
}
