import { apiEnv } from "@dansr/api-env";
import { getAuthenticatedUser } from "@dansr/api-services";
import { ApiResponseHandler } from "@dansr/api-utils";
import { DB_ID_PREFIXES, USER_TYPES } from "@dansr/common-constants";
import { creatorInvitesTable, db, generateDbId } from "@dansr/common-db";
import type { GenerateInviteCodeApiResponse } from "@dansr/common-types";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const apiResponseHandler = new ApiResponseHandler(req);

    try {
        const { user } = await getAuthenticatedUser([
            USER_TYPES.ADMIN,
            USER_TYPES.CREATOR,
        ]);

        if (!user) {
            return apiResponseHandler.authError();
        }

        const inviteCode = generateDbId(DB_ID_PREFIXES.CREATOR_INVITE);

        await db.insert(creatorInvitesTable).values({
            id: inviteCode,
            creatorId: user.id,
        });

        return apiResponseHandler.success<GenerateInviteCodeApiResponse>(
            {
                inviteCode,
                inviteUrl: `${apiEnv.FRONTEND_URL}/auth?invite_code=${inviteCode}`,
            },
            "Invite code generated successfully!"
        );
    } catch (error) {
        return apiResponseHandler.serverError(error);
    }
}
