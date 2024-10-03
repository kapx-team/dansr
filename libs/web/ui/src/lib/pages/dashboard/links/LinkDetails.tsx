import type { Link } from "@dansr/common-db";
import { formatDate } from "@dansr/common-utils";

type LinkDetailsProps = {
    link: Link;
};

export function LinkDetails({ link }: LinkDetailsProps) {
    return (
        <div className="space-y-4">
            <DetailItem
                title="URL"
                value={`https://dansr.io/links/${link.id}`}
            />
            <DetailItem title="Name" value={link.name ?? "N/A"} />
            <DetailItem title="Creator ID" value={link.creatorId ?? "N/A"} />
            <DetailItem
                title="Created At"
                value={formatDate(link.createdAt, true)}
            />
            <DetailItem
                title="Expires At"
                value={formatDate(link.expiresAt, true)}
            />
            <DetailItem title="Token" value={link?.token?.symbol ?? "N/A"} />
            <DetailItem
                title="Base Amount"
                value={link.baseAmount.toString()}
            />
            <DetailItem title="Wallet Address" value={link.walletAddress} />
            <DetailItem
                title="Number of Bids"
                value={link.numberOfBids.toString()}
            />
            <DetailItem
                title="Winning Bids Selected"
                value={link.winningBidsSelected ? "Yes" : "No"}
            />
        </div>
    );
}

function DetailItem({ title, value }: { title: string; value: string }) {
    return (
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="break-all">{value}</p>
        </div>
    );
}
