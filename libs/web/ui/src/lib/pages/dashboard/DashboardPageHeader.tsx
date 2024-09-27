import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

type DashboardPageHeaderProps = {
    headerText: string;
    headerSubText?: string;
    button?: React.ReactNode;
    showBackButton?: boolean;
    backLink?: string;
    backAction?: () => void;
};

function RenderBackButton({
    backLink,
    headerText,
    backAction,
}: {
    backLink?: string;
    headerText: string;
    backAction?: () => void;
}) {
    if (backLink) {
        return (
            <Link href={backLink} className="hover:text-primary-1">
                <div className="flex items-center space-x-2">
                    <FiArrowLeft className="text-2xl" />

                    <h1 className="text-4xl font-bold">{headerText}</h1>
                </div>
            </Link>
        );
    }

    if (backAction) {
        return (
            <button
                type="button"
                onClick={backAction}
                className="flex items-center space-x-2 hover:text-primary-1"
            >
                <FiArrowLeft className="text-2xl" />

                <h1 className="text-4xl font-bold">{headerText}</h1>
            </button>
        );
    }
}

export function DashboardPageHeader({
    headerText,
    headerSubText,
    button,
    showBackButton = false,
    backLink,
    backAction,
}: DashboardPageHeaderProps) {
    return (
        <div className="sticky top-0 z-10 -mx-6 flex items-center justify-between bg-primary-1 px-6 py-10">
            <div className="space-y-1 font-karla">
                {showBackButton ? (
                    <RenderBackButton
                        backLink={backLink}
                        headerText={headerText}
                        backAction={backAction}
                    />
                ) : (
                    <h1 className="text-4xl font-bold">{headerText}</h1>
                )}

                {headerSubText && (
                    <p className="text-gray-400">{headerSubText}</p>
                )}
            </div>

            <div>{button}</div>
        </div>
    );
}
