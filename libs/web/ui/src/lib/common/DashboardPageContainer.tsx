type DashboardPageContainerProps = React.ComponentProps<"div">;

export function DashboardPageContainer({
    children,
}: DashboardPageContainerProps) {
    return (
        <div className="ml-[70px] px-7 pb-10 lg:ml-[250px] lg:px-14">
            {children}
        </div>
    );
}
