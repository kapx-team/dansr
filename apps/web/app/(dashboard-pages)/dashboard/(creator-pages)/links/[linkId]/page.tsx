import { Button, Tabs } from "@dansr/common-ui";
import { BidsTable, LinkDetails } from "@dansr/web-ui";
import { DashboardPageHeader } from "@dansr/web-ui/server";
import { getServerApiClient } from "@dansr/web-utils/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function DashboardLinkDetailsPage({
    params,
}: {
    params: {
        linkId: string;
    };
}) {
    const cookieStore = cookies();

    const apiClient = getServerApiClient(cookieStore);

    const { linkId } = params;

    const link = await apiClient.links.getLinkDetails(linkId);

    return (
        <>
            <DashboardPageHeader
                headerText="Link Details"
                headerSubText="View and manage your link details"
                button={
                    <div className="flex gap-2">
                        <Button isDisabled={true}>Edit Link</Button>
                        <Button isDisabled={true}>Delete Link</Button>
                    </div>
                }
            />

            <Tabs
                tabs={[
                    {
                        label: "Link Details",
                        content: <LinkDetails link={link} />,
                    },
                    {
                        label: "Bids",
                        content: <BidsTable linkId={linkId} />,
                    },
                ]}
            />
        </>
    );
}
