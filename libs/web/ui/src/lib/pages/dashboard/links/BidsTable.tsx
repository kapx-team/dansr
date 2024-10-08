"use client";

import { BID_ANSWER_STATUSES, BID_STATUSES } from "@dansr/common-constants";
import type { LinkBid } from "@dansr/common-db";
import { Button } from "@dansr/common-ui";
import { formatDate } from "@dansr/common-utils";
import { useAnswerBid, useLinkBids } from "@dansr/web-hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

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
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
    const [answer, setAnswer] = useState("");
    const answerBidMutation = useAnswerBid();

    async function handleAnswerSubmit() {
        await answerBidMutation.mutateAsync(
            { bidId: bid.id, answer },
            {
                onSuccess: () => {
                    setIsAnswerModalOpen(false);
                    setAnswer("");
                },
            }
        );
    }

    return (
        <div className="grid grid-cols-7 gap-x-4 py-4 px-4 text-sm text-gray-500 hover:bg-gray-50">
            <div className="font-medium text-gray-900">
                {bid.bidderXUsername}
            </div>
            <div>{bid.amount}</div>
            <div>{bid.status}</div>
            <div>{bid.message}</div>
            <div>{bid.answerStatus}</div>
            <div>{formatDate(bid.createdAt, true)}</div>
            <div>
                {bid.status === BID_STATUSES.SELECTED &&
                    bid.answerStatus === BID_ANSWER_STATUSES.PENDING && (
                        <Dialog.Root
                            open={isAnswerModalOpen}
                            onOpenChange={setIsAnswerModalOpen}
                        >
                            <Dialog.Trigger asChild>
                                <Button size="sm">Answer</Button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-primary-1 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                                    <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                                        Answer Bid
                                    </Dialog.Title>
                                    <textarea
                                        value={answer}
                                        onChange={(e) =>
                                            setAnswer(e.target.value)
                                        }
                                        placeholder="Enter your answer..."
                                        className="min-h-[100px] resize-none text-black"
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <Dialog.Close asChild>
                                            <Button>Cancel</Button>
                                        </Dialog.Close>
                                        <Button
                                            onClick={handleAnswerSubmit}
                                            isLoading={
                                                answerBidMutation.isPending
                                            }
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                    <Dialog.Close asChild>
                                        <button
                                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                                            aria-label="Close"
                                        >
                                            <RxCross2 className="h-4 w-4" />
                                            <span className="sr-only">
                                                Close
                                            </span>
                                        </button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    )}
            </div>
        </div>
    );
}
