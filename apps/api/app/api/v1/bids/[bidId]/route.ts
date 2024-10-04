import { getAuthenticatedUser } from "@dansr/api-services";
import { ApiResponseHandler } from "@dansr/api-utils";
import { USER_TYPES } from "@dansr/common-constants";
import { db, linkBidsTable, linksTable } from "@dansr/common-db";
import type { GetBidDetailsApiResponse } from "@dansr/common-types";
import { eq, getTableColumns } from "drizzle-orm";
import { type NextRequest } from "next/server";

type Params = {
    params: {
        bidId: string;
    };
};

export async function GET(req: NextRequest, { params }: Params) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { bidId } = params;

        const { user } = await getAuthenticatedUser([
            USER_TYPES.NORMAL,
            USER_TYPES.CREATOR,
            USER_TYPES.ADMIN,
        ]);

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

        if (!user) {
            return apiResponseHandler.authError();
        }

        if (
            user.type === USER_TYPES.CREATOR &&
            bid.link.creatorId !== user.id
        ) {
            return apiResponseHandler.authError();
        }

        if (user.type === USER_TYPES.NORMAL && bid.userId !== user.id) {
            return apiResponseHandler.authError();
        }

        return apiResponseHandler.success<GetBidDetailsApiResponse>(
            bid,
            "Bid details fetched successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
