import { getAuthenticatedUser } from "@dansr/api-services";
import { ApiResponseHandler } from "@dansr/api-utils";
import { USER_TYPES } from "@dansr/common-constants";
import { db, linksTable } from "@dansr/common-db";
import type { GetLinksApiResponse } from "@dansr/common-types";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

type Params = {
    params: {
        creatorId: string;
    };
};

export async function GET(req: NextRequest, { params }: Params) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { creatorId } = params;

        const { user } = await getAuthenticatedUser([USER_TYPES.CREATOR]);

        if (!user || user?.id !== creatorId) {
            return apiResponseHandler.authError();
        }

        const links = await db
            .select()
            .from(linksTable)
            .where(eq(linksTable.creatorId, creatorId));

        return apiResponseHandler.success<GetLinksApiResponse>(
            links,
            "Links fetched successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
