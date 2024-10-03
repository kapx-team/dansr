import { getToken } from "@dansr/api-functions";
import { getAuthenticatedUser } from "@dansr/api-services";
import { ApiResponseHandler } from "@dansr/api-utils";
import { USER_TYPES } from "@dansr/common-constants";
import { db, linksTable, type Link } from "@dansr/common-db";
import type { GetLinkDetailsApiResponse } from "@dansr/common-types";
import { eq } from "drizzle-orm";
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

        let linkWithToken: Link = link;

        const token = await getToken(link.tokenMint);

        if (token) {
            linkWithToken = { ...link, token };
        }

        return apiResponseHandler.success<GetLinkDetailsApiResponse>(
            linkWithToken,
            "Link details fetched successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
