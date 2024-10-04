import { Tabs } from "@dansr/common-ui";
import { BidDetails } from "@dansr/web-ui";
import { DashboardPageHeader } from "@dansr/web-ui/server";
import { getServerApiClient } from "@dansr/web-utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardBidDetailsPage({
    params,
}: {
    params: {
        bidId: string;
    };
}) {
    const cookieStore = cookies();

    const apiClient = getServerApiClient(cookieStore);

    const user = await apiClient.auth.getAuthenticatedUser();

    if (!user) {
        redirect("/auth");
    }

    const { bidId } = params;

    const bid = await apiClient.bids.getBidDetails(bidId);

    return (
        <>
            <DashboardPageHeader
                headerText="Bid Details"
                headerSubText="View and manage your bid details"
                showBackButton={true}
                backLink="/dashboard/bids"
            />

            <Tabs
                tabs={[
                    {
                        label: "Bid Details",
                        content: <BidDetails bid={bid} />,
                    },
                ]}
            />
        </>
    );
}
