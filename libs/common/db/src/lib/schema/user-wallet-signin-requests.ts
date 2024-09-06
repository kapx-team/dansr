import { DB_ID_PREFIXES } from "@dansr/common-constants";
import type { Header, Payload } from "@web3auth/sign-in-with-solana";
import { boolean, json, mysqlTable } from "drizzle-orm/mysql-core";
import { getCommonSchemaAttributes } from "../utils/general";

export const userWalletSigninRequestsTable = mysqlTable(
    "user_wallet_signin_requests",
    {
        ...getCommonSchemaAttributes(DB_ID_PREFIXES.USER_WALLET_SIGNIN_REQUEST),
        header: json("header").notNull().$type<Header>(),
        payload: json("payload").notNull().$type<Payload>(),
        isVerified: boolean("is_verified").default(false),
    }
);
