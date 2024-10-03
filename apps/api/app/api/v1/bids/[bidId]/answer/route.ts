import { getAuthenticatedUser } from "@dansr/api-services";
import { ApiResponseHandler, validateReqBody } from "@dansr/api-utils";
import {
    BID_ANSWER_STATUSES,
    BID_STATUSES,
    USER_TYPES,
} from "@dansr/common-constants";
import { db, linkBidsTable, linksTable } from "@dansr/common-db";
import type { AnswerBidApiResponse } from "@dansr/common-types";
import { answerBidSchema } from "@dansr/common-validators";
import { payCreatorForAnsweringBid } from "@dansr/trigger";
import { eq, getTableColumns } from "drizzle-orm";
import { type NextRequest } from "next/server";

type Params = {
    params: {
        bidId: string;
    };
};

export async function POST(req: NextRequest, { params }: Params) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { bidId } = params;

        const { user } = await getAuthenticatedUser([USER_TYPES.CREATOR]);

        const [bid] = await db
            .select({
                ...getTableColumns(linkBidsTable),
                link: getTableColumns(linksTable),
            })
            .from(linkBidsTable)
            .innerJoin(linksTable, eq(linkBidsTable.linkId, linksTable.id))
            .where(eq(linkBidsTable.id, bidId));

        if (!bid) {
            return apiResponseHandler.clientError("Bid not found");
        }

        if (bid.status !== BID_STATUSES.SELECTED) {
            return apiResponseHandler.clientError("Bid is not selected yet!");
        }

        if (bid.answerStatus === BID_ANSWER_STATUSES.ANSWERED) {
            return apiResponseHandler.clientError("Bid already answered!");
        }

        if (!user || user?.id !== bid?.link?.creatorId) {
            return apiResponseHandler.authError();
        }

        const bodyValidationResult = await validateReqBody({
            req,
            schema: answerBidSchema,
        });

        if (!bodyValidationResult.success) {
            return apiResponseHandler.clientError(bodyValidationResult.error);
        }

        const { answer } = bodyValidationResult.body;

        await db.transaction(async (trx) => {
            await trx
                .update(linkBidsTable)
                .set({
                    answer,
                    answeredOn: new Date(),
                    answerStatus: BID_ANSWER_STATUSES.ANSWERED,
                })
                .where(eq(linkBidsTable.id, bidId));

            const triggerResponse = await payCreatorForAnsweringBid.trigger({
                bidId,
            });

            if (!triggerResponse.id) {
                throw new Error(
                    "Failed to trigger pay creator for answering bid"
                );
            }
        });

        return apiResponseHandler.success<AnswerBidApiResponse>(
            {
                bidId,
                answer,
                linkId: bid.linkId,
            },
            "Bid answered successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
