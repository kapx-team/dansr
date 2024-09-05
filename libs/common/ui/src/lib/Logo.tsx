import { logoImg, logoMobileImg } from "@dansr/common-assets";
import Image from "next/image";

type LogoProps = {
    className?: string;
    noHideOnMobile?: boolean;
};

export function Logo({ className = "", noHideOnMobile = false }: LogoProps) {
    return (
        <>
            <Image
                src={logoImg}
                alt="dansr-logo"
                className={`${
                    noHideOnMobile ? "block" : "hidden lg:block"
                } ${className}`}
            />

            <Image
                src={logoMobileImg}
                alt="dansr-logo"
                className={`${
                    noHideOnMobile ? "hidden" : "lg:hidden"
                } ${className}`}
            />
        </>
    );
}
