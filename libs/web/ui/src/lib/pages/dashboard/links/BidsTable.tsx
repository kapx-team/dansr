"use client";

import { BID_ANSWER_STATUSES, BID_STATUSES } from "@dansr/common-constants";
import type { LinkBid } from "@dansr/common-db";
import { Button } from "@dansr/common-ui";
import { formatDate } from "@dansr/common-utils";
import { useLinkBids } from "@dansr/web-hooks";

type BidsTableProps = {
    linkId: string;
};

export function BidsTable({ linkId }: BidsTableProps) {
    const { data: bids, isLoading } = useLinkBids(linkId);

    if (isLoading)
        return <div className="text-center py-4">Loading bids...</div>;

    if (!bids || bids.length === 0)
        return (
            <div className="text-center py-4">No bids found for this link.</div>
        );

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Bids for Link</h2>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <div className="min-w-full divide-y divide-gray-300">
                            <div className="bg-gray-50">
                                <div className="grid grid-cols-7 gap-x-4 py-3.5 px-4 text-left text-sm font-semibold text-gray-900">
                                    <div>Bidder X Username</div>
                                    <div>Amount</div>
                                    <div>Status</div>
                                    <div>Message</div>
                                    <div>Answer Status</div>
                                    <div>Created At</div>
                                    <div>Actions</div>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200 bg-white">
                                {bids.map((bid) => (
                                    <BidRow key={bid.id} bid={bid} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BidRow({ bid }: { bid: LinkBid }) {
    return (
        <div className="grid grid-cols-7 gap-x-4 py-4 px-4 text-sm text-gray-500 hover:bg-gray-50">
            <div className="font-medium text-gray-900">
                {bid.bidderXUsername}
            </div>
            <div>{bid.amount}</div>
            <div>{bid.status}</div>
            <div className="truncate">{bid.message}</div>
            <div>{bid.answerStatus}</div>
            <div>{formatDate(bid.createdAt, true)}</div>
            <div>
                {bid.status === BID_STATUSES.SELECTED &&
                    bid.answerStatus === BID_ANSWER_STATUSES.PENDING && (
                        <Button size="sm">Answer</Button>
                    )}
            </div>
        </div>
    );
}
