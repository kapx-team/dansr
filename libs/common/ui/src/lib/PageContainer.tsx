import { cn } from "@dansr/common-utils";

type PageContainerProps = React.ComponentProps<"div">;

export function PageContainer({
    children,
    className,
    ...props
}: PageContainerProps) {
    return (
        <div className={cn("w-full p-4 lg:p-8", className)} {...props}>
            {children}
        </div>
    );
}
