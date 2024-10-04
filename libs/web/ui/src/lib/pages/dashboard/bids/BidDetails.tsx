import type { LinkBid } from "@dansr/common-db";
import { formatDate } from "@dansr/common-utils";

type BidDetailsProps = {
    bid: LinkBid;
};

export function BidDetails({ bid }: BidDetailsProps) {
    return (
        <div className="space-y-4">
            <DetailItem title="Bid ID" value={bid.id} />
            <DetailItem title="Link ID" value={bid.linkId} />
            <DetailItem
                title="Created At"
                value={formatDate(bid.createdAt, true)}
            />

            <DetailItem title="Amount" value={`${bid.amount}`} />
            <DetailItem title="Status" value={bid.status} />
            <DetailItem title="Bid Answer Status" value={bid.answerStatus} />
            {bid.answer && <DetailItem title="Bid Answer" value={bid.answer} />}
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
