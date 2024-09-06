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
