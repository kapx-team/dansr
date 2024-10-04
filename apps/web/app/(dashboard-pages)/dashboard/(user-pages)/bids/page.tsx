import { BidList } from "@dansr/web-ui";
import { DashboardPageHeader } from "@dansr/web-ui/server";
import { Suspense } from "react";

export default function DashboardBidsPage() {
    return (
        <>
            <DashboardPageHeader
                headerText="Your Bids"
                headerSubText="Manage and track your bids"
            />

            <Suspense fallback={<div>Loading bids...</div>}>
                <BidList />
            </Suspense>
        </>
    );
}
