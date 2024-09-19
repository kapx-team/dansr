import { cn } from "@dansr/common-utils";

type PageContainerProps = React.ComponentProps<"div">;

export function PageContainer({
    children,
    className,
    ...props
}: PageContainerProps) {
    return (
        <div
            className={cn(
                "w-full max-w-[1440px] mx-auto p-4 lg:p-8",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
