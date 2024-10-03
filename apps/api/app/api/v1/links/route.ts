import { getToken } from "@dansr/api-functions";
import { getAuthenticatedUser } from "@dansr/api-services";
import { ApiResponseHandler, validateReqBody } from "@dansr/api-utils";
import { DB_ID_PREFIXES, USER_TYPES } from "@dansr/common-constants";
import {
    db,
    generateDbId,
    linksTable,
    type InsertLink,
} from "@dansr/common-db";
import type {
    GenerateLinkApiResponse,
    GetLinksApiResponse,
} from "@dansr/common-types";
import { generateLinkSchema } from "@dansr/common-validators";
import { addDays, addHours } from "date-fns";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { user } = await getAuthenticatedUser([USER_TYPES.ADMIN]);

        if (!user) {
            return apiResponseHandler.authError();
        }

        const links = await db.select().from(linksTable);

        return apiResponseHandler.success<GetLinksApiResponse>(
            links,
            "Links fetched successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}

export async function POST(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { user } = await getAuthenticatedUser([USER_TYPES.CREATOR]);

        if (!user) {
            return apiResponseHandler.authError();
        }

        const bodyValidationResult = await validateReqBody({
            req,
            schema: generateLinkSchema,
        });

        if (!bodyValidationResult.success) {
            return apiResponseHandler.clientError(bodyValidationResult.error);
        }

        const {
            name,
            baseAmount,
            tokenMint,
            walletAddress,
            numberOfBids,
            expiration,
        } = bodyValidationResult.body;

        const token = getToken(tokenMint);

        if (!token) {
            return apiResponseHandler.clientError(
                "Invalid token mint address!"
            );
        }

        const currentDate = new Date();

        let expirationDate = new Date(currentDate);

        switch (expiration) {
            case "1h":
                expirationDate = addHours(currentDate, 1);
                break;
            case "3h":
                expirationDate = addHours(currentDate, 3);
                break;
            case "6h":
                expirationDate = addHours(currentDate, 6);
                break;
            case "12h":
                expirationDate = addHours(currentDate, 12);
                break;
            case "1d":
                expirationDate = addDays(currentDate, 1);
                break;
            case "2d":
                expirationDate = addDays(currentDate, 2);
                break;
        }

        const linkData = {
            id: generateDbId(DB_ID_PREFIXES.LINK),
            baseAmount,
            tokenMint,
            walletAddress,
            numberOfBids,
            expiresAt: expirationDate,
            name: name ?? null,
            creatorId: user.id,
        } satisfies InsertLink;

        await db.insert(linksTable).values(linkData);

        return apiResponseHandler.success<GenerateLinkApiResponse>(
            linkData,
            "Link generated successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
