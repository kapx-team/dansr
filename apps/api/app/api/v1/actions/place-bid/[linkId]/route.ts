import { apiEnv } from "@dansr/api-env";
import { getToken, isLinkExpired } from "@dansr/api-functions";
import {
    createDbLinksService,
    createDbUserService,
} from "@dansr/api-services/db";
import { getDansrBidsWalletAndKeypair } from "@dansr/api-utils";
import { DB_ID_PREFIXES } from "@dansr/common-constants";
import { generateDbId } from "@dansr/common-db";
import { extractErrorMessage, getSolanaConnection } from "@dansr/common-utils";
import {
    ActionGetResponse,
    createPostResponse,
    type ActionPostRequest,
} from "@solana/actions";
import {
    createTransferInstruction,
    getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import {
    ComputeBudgetProgram,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
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
            icon: `https://api.dansr.io/v1/og/link/${linkId}.png`,
            description: `Place bid for chance to get attention of @${link.creator.xHandle}`,
            label,
            title: `Place bid for chance to get attention of @${link.creator.xHandle}`,
            disabled: isExpired,
            links: {
                actions: [
                    {
                        label,
                        href: `/v1/actions/place-bid/${linkId}?message={message}&amount={amount}&x_username={x_username}`,
                        parameters: [
                            {
                                name: "message",
                                label: "Enter your message",
                                required: true,
                                type: "textarea",
                            },
                            {
                                name: "amount",
                                label: `Enter the bid amount in ${token.symbol}`,
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

        const reference = Keypair.generate().publicKey;
        const BID_FEE = new BigNumber(0.01);

        const tx = new Transaction();

        const solTransferInstruction = SystemProgram.transfer({
            fromPubkey: accountPubkey,
            toPubkey: new PublicKey(apiEnv.DANSR_BID_FEES_WALLET),
            lamports: BID_FEE.times(LAMPORTS_PER_SOL).toNumber(),
        });

        tx.add(solTransferInstruction);

        const { wallet: dansrBidsWallet } = getDansrBidsWalletAndKeypair();

        const token = await getToken(link.tokenMint);

        if (!token) {
            throw new Error("Invalid token mint!");
        }

        const isSolTokenMint =
            token.address === "So11111111111111111111111111111111111111112";

        if (!isSolTokenMint) {
            const tokenMintPubkey = new PublicKey(link.tokenMint);
            const creatorTokenAccount = getAssociatedTokenAddressSync(
                tokenMintPubkey,
                dansrBidsWallet
            );
            const bidderTokenAccount = getAssociatedTokenAddressSync(
                tokenMintPubkey,
                accountPubkey
            );

            const tokenTransferInstruction = createTransferInstruction(
                bidderTokenAccount,
                creatorTokenAccount,
                accountPubkey,
                BigInt(bidAmount.times(10 ** token.decimals).toNumber())
            );

            tx.add(tokenTransferInstruction);
        } else {
            const solTransferInstruction = SystemProgram.transfer({
                fromPubkey: accountPubkey,
                toPubkey: dansrBidsWallet,
                lamports: bidAmount.times(LAMPORTS_PER_SOL).toNumber(),
            });

            tx.add(solTransferInstruction);
        }

        if (reference) {
            tx.instructions[1].keys.push({
                pubkey: reference,
                isWritable: false,
                isSigner: false,
            });
        }

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
            reference: reference.toBase58(), // Store the reference in the database
        });

        tx.feePayer = accountPubkey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

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
