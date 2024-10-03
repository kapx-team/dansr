import { getToken } from "@dansr/api-functions";
import { getAuthenticatedUser } from "@dansr/api-services";
import { ApiResponseHandler } from "@dansr/api-utils";
import { BID_STATUSES, USER_TYPES } from "@dansr/common-constants";
import { db, linkBidsTable, linksTable } from "@dansr/common-db";
import type { GetLinkBidsApiResponse } from "@dansr/common-types";
import { and, eq, ne, sql } from "drizzle-orm";
import { type NextRequest } from "next/server";

type Params = {
    params: {
        linkId: string;
    };
};

export async function GET(req: NextRequest, { params }: Params) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { linkId } = params;

        const { user } = await getAuthenticatedUser([
            USER_TYPES.CREATOR,
            USER_TYPES.ADMIN,
        ]);

        if (!user) {
            return apiResponseHandler.authError();
        }

        const [link] = await db
            .select()
            .from(linksTable)
            .where(eq(linksTable.id, linkId));

        if (!link) {
            return apiResponseHandler.clientError("Link not found!");
        }

        if (user.type === USER_TYPES.CREATOR && link.creatorId !== user.id) {
            return apiResponseHandler.authError();
        }

        const token = await getToken(link.tokenMint);

        if (!token) {
            throw new Error("Token not found!");
        }

        const bids = await db
            .select()
            .from(linkBidsTable)
            .where(
                and(
                    eq(linkBidsTable.linkId, linkId),
                    ne(linkBidsTable.status, BID_STATUSES.PENDING)
                )
            ).orderBy(sql`CASE 
                WHEN ${linkBidsTable.status} = ${BID_STATUSES.SELECTED} THEN 1
                WHEN ${linkBidsTable.status} = ${BID_STATUSES.NOT_SELECTED} THEN 2
                WHEN ${linkBidsTable.status} = ${BID_STATUSES.CREATED} THEN 3
                ELSE 4
            END`);

        return apiResponseHandler.success<GetLinkBidsApiResponse>(
            bids,
            "Link bids details fetched successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
