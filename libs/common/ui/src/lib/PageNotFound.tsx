import Image from "next/image";

import { pageNotFoundImg } from "@dansr/common-assets";

export function PageNotFound() {
    return (
        <div className="mt-[4rem] flex flex-col items-center space-y-[68px] px-5 md:mt-[7rem] lg:px-20 ">
            <div className="gap flex flex-col items-center space-y-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-primary-1">
                        Looks like we threw you into the deep end.
                    </h1>
                    <p className="mt-4 text-base font-normal">
                        The page you&apos;re trying to swim to is out of reach.
                        Better paddle back to safety before you get lost at sea!
                    </p>
                </div>
            </div>
            <Image
                src={pageNotFoundImg}
                alt="404-not-found"
                className="aspect-auto h-[470px]"
            />
        </div>
    );
}
