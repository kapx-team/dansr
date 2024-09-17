import type { SelectFreeQuestion, SelectUser } from "@dansr/common-db";
import type { ApiResponseType } from "./general";

export type GetWalletSignInMessageApiResponse = ApiResponseType<{
    message: string;
    requestId: string;
}>;

export type WalletSignInRequestApiResponse = ApiResponseType<{
    id: string;
    wallet: string;
}>;

export type UserSignOutApiResponse = ApiResponseType<{
    id: string;
}>;

export type GetXSigninUrlApiResponse = ApiResponseType<{
    isXAuthorized: boolean;
    url?: string;
}>;

export type AddFreeQuestionApiResponse = ApiResponseType<
    Partial<SelectFreeQuestion>
>;

export type GetAuthenticatedUserApiResponse = ApiResponseType<SelectUser>;

export type XSigninCallbackApiResponse = ApiResponseType<{
    userId: string;
}>;
