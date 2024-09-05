import { ApiResponseHandler } from "@dansr/api-utils";
import { db, usersTable } from "@dansr/common-db";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        await db.select().from(usersTable).limit(1);

        return apiResponseHandler.success(
            { success: true },
            "API working successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
};
