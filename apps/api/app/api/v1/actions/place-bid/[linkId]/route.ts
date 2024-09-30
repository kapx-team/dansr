import { apiEnv } from "@dansr/api-env";
import { getToken, isLinkExpired } from "@dansr/api-functions";
import {
    createDbLinksService,
    createDbUserService,
} from "@dansr/api-services/db";
import { DB_ID_PREFIXES } from "@dansr/common-constants";
import { generateDbId } from "@dansr/common-db";
import { extractErrorMessage, getSolanaConnection } from "@dansr/common-utils";
import {
    ActionGetResponse,
    createPostResponse,
    type ActionPostRequest,
} from "@solana/actions";
import {
    createTransfer,
    encodeURL,
    type CreateTransferFields,
} from "@solana/pay";
import { ComputeBudgetProgram, Keypair, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { NextResponse, type NextRequest } from "next/server";

type Params = {
    params: {
        linkId: string;
    };
};

export async function GET(req: NextRequest, { params }: Params) {
    try {
        const { linkId } = params;

        const linkDbService = createDbLinksService();

        const link = await linkDbService.getLinkWithCreatorInfo(linkId);

        if (!link) {
            return NextResponse.json({ error: "Link not found!" });
        }

        const isExpired = await isLinkExpired(link.expiresAt);

        const token = await getToken(link.tokenMint);

        if (!token) {
            throw new Error("Invalid token mint!");
        }

        const label = isExpired
            ? `Bidding closed as link expired!`
            : `Place Bid using ${token.symbol}`;

        const result = {
            icon: `https://api.dansr.io/og/link/${linkId}.png`,
            description: `Place bid for chance to get attention of @${link.creator.xHandle}`,
            label,
            title: `Place bid for chance to get attention of @${link.creator.xHandle}`,
            disabled: isExpired,
            links: {
                actions: [
                    {
                        label,
                        href: `/api/v1/actions/place-bid/${linkId}?message={message}&amount={amount}&x_username={x_username}`,
                        parameters: [
                            {
                                name: "message",
                                label: "Enter your message",
                                required: true,
                                type: "textarea",
                            },
                            {
                                name: "amount",
                                label: "Enter the bid amount",
                                required: true,
                                type: "number",
                                min: link.baseAmount,
                            },
                            {
                                name: "x_username",
                                label: "Enter your X username",
                                required: true,
                                type: "text",
                            },
                        ],
                    },
                ],
            },
        } satisfies ActionGetResponse;

        return NextResponse.json(result);
    } catch (error) {
        console.error("error =>", extractErrorMessage(error));
        return NextResponse.json({ error: "Internal server error!" });
    }
}

export async function POST(req: NextRequest, { params }: Params) {
    try {
        const { linkId } = params;

        const searchParams = req.nextUrl.searchParams;

        const message = searchParams.get("message");
        const amount = searchParams.get("amount");
        const xUsername = searchParams.get("x_username");

        if (!message) {
            return NextResponse.json({ error: "Message is required!" });
        }

        if (!amount) {
            return NextResponse.json({ error: "Bid amount is required!" });
        }

        if (!xUsername) {
            return NextResponse.json({ error: "X username is required!" });
        }

        const body = (await req.json()) as ActionPostRequest;

        const { account } = body;

        if (!account) {
            return NextResponse.json({ error: "Account not found!" });
        }

        const accountPubkey = new PublicKey(account);

        const linksDbService = createDbLinksService();

        const link = await linksDbService.getLinkWithCreatorInfo(linkId);

        if (!link) {
            throw new Error("Link not found!");
        }

        const isExpired = await isLinkExpired(link.expiresAt);

        if (isExpired) {
            throw new Error("Link expired!");
        }

        const userDbService = createDbUserService();

        let user;

        const existingUser = await userDbService.getUserByWalletAddress(
            accountPubkey.toBase58()
        );

        if (!existingUser) {
            user = await userDbService.createUserByWalletAddress(
                accountPubkey.toBase58()
            );
        } else {
            user = existingUser;
        }

        if (!user) {
            throw new Error("Failed to find or create user!");
        }

        const bidAmount = new BigNumber(amount.toString());

        const connection = getSolanaConnection(apiEnv.SOLANA_RPC_URL);

        const memo = `Link-Bid-${linkId}`;
        const reference = new Keypair().publicKey;
        const BID_FEE = new BigNumber(0.01);

        const transferData = {
            recipient: new PublicKey(apiEnv.DANSR_BID_FEES_WALLET),
            amount: BID_FEE,
            memo,
            reference,
        } satisfies CreateTransferFields;

        const solanaPayUrl = encodeURL(transferData).toString();

        const tx = await createTransfer(
            connection,
            accountPubkey,
            transferData
        );

        const priorityFee = await connection.getRecentPrioritizationFees();

        const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: priorityFee[0].prioritizationFee,
        });

        tx.add(addPriorityFee);

        const bidId = generateDbId(DB_ID_PREFIXES.LINK_BID);

        await linksDbService.createLinkBid({
            id: bidId,
            linkId,
            userId: user.id,
            amount: bidAmount.toNumber(),
            bidderXUsername: xUsername,
            message,
            solanaPayUrl,
        });

        tx.feePayer = accountPubkey;
        tx.recentBlockhash = (
            await getSolanaConnection(
                apiEnv.SOLANA_RPC_URL
            ).getLatestBlockhash()
        ).blockhash;

        const result = await createPostResponse({
            fields: {
                transaction: tx,
                message: "Bid placed successfully!",
            },
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("error =>", extractErrorMessage(error));
        return NextResponse.json({ error: "Internal server error!" });
    }
}
