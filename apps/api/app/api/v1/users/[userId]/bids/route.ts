import { getAuthenticatedUser } from "@dansr/api-services";
import { ApiResponseHandler } from "@dansr/api-utils";
import { USER_TYPES } from "@dansr/common-constants";
import { db, linkBidsTable } from "@dansr/common-db";
import type { GetUserBidsApiResponse } from "@dansr/common-types";
import { desc, eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

type Params = {
    params: {
        userId: string;
    };
};

export async function GET(req: NextRequest, { params }: Params) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { userId } = params;

        const { user } = await getAuthenticatedUser([USER_TYPES.NORMAL]);

        if (!user || user?.id !== userId) {
            return apiResponseHandler.authError();
        }

        const bids = await db
            .select()
            .from(linkBidsTable)
            .where(eq(linkBidsTable.userId, userId))
            .orderBy(desc(linkBidsTable.createdAt));

        return apiResponseHandler.success<GetUserBidsApiResponse>(
            bids,
            "Bids fetched successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
