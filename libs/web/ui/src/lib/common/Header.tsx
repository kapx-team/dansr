"use client";

import { Button } from "@dansr/common-ui";
import { Logo, PageContainer } from "@dansr/common-ui/server";
import { cn } from "@dansr/common-utils";
import Link from "next/link";
import { useEffect } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useBoolean } from "usehooks-ts";

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

export function Header() {
    const { value: isScrolled, setValue: setIsScrolled } = useBoolean(false);

    const { value: isMobileMenuOpen, setValue: setIsMobileMenuOpen } =
        useBoolean(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // eslint-disable-line

    return (
        <header
            className={cn(
                "sticky top-0",
                isScrolled &&
                    "bg-white/10 backdrop-blur-lg z-30 transition-all duration-75 ease-linear"
            )}
        >
            <PageContainer className="flex justify-between items-center">
                <Link href="/">
                    <Logo />
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex gap-8">
                        {NAV_LINKS.map((link) => {
                            return (
                                <li
                                    key={link.label}
                                    className="hover:text-primary-2"
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <Button className="hidden md:block" link="/dashboard">
                    Get Started
                </Button>

                <button
                    className="text-2xl md:hidden"
                    onClick={() =>
                        setIsMobileMenuOpen((prevState) => !prevState)
                    }
                >
                    {isMobileMenuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
                </button>
            </PageContainer>
            {isMobileMenuOpen && <MobileMenu />}
        </header>
    );
}

export function MobileMenu() {
    return (
        <PageContainer className="flex flex-col gap-6 md:hidden">
            <nav>
                <ul className="flex flex-col gap-3">
                    {NAV_LINKS.map((link) => {
                        return (
                            <li
                                key={link.label}
                                className="hover:text-primary-2"
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <Button link="/dashboard">Get Started</Button>
        </PageContainer>
    );
}
