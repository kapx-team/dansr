"use client";

import { clientErrorImg } from "@dansr/common-assets";
import { cn } from "@dansr/common-utils";
import Image from "next/image";

type ClientErrorPageProps = {
    retry: () => void;
    className?: string;
};

export function ClientErrorPage({ retry, className }: ClientErrorPageProps) {
    return (
        <div
            className={cn(
                "flex min-h-[95vh] flex-col items-center justify-center",
                className
            )}
        >
            <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center space-y-6">
                <Image src={clientErrorImg} alt="empty history page image" />
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-primary-1">
                        Oops! Something went wrong while fetching the data.
                    </h1>
                    <p className="pb-2 text-center text-base font-normal text-white">
                        The data you are trying to fetch could not be found.
                        This might be due to an incorrect URL or a temporary
                        issue with the server.
                    </p>
                    <p className="flex items-center space-x-1 text-base font-normal leading-[18.7px] text-gray-400">
                        <span>
                            If the problem persists, please contact our support
                            team at
                        </span>
                        <a
                            href="mailto:support@dansr.io"
                            className="hover:text-primary-1"
                        >
                            support@dansr.io
                        </a>
                    </p>
                </div>

                {/* <Button
                    onClick={retry}
                    variant="outline"
                    className="h-[44px] px-[16px] py-[12px] text-base font-medium leading-[20px]"
                >
                    Try Again
                </Button> */}
            </div>
        </div>
    );
}
