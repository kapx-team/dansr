import { CreateLinkButton, LinkList } from "@dansr/web-ui";
import { DashboardPageHeader } from "@dansr/web-ui/server";
import { Suspense } from "react";

export default function DashboardLinksPage() {
    return (
        <>
            <DashboardPageHeader
                headerText="Your Links"
                headerSubText="Manage and track your created links"
                button={<CreateLinkButton />}
            />

            {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Suspense
                    fallback={
                        <div className="bg-white p-4 rounded shadow">
                            Loading...
                        </div>
                    }
                >
                    <LinkStats />
                </Suspense>
            </div> */}

            <Suspense fallback={<div>Loading links...</div>}>
                <LinkList />
            </Suspense>
        </>
    );
}
