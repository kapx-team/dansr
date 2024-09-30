/* eslint-disable @next/next/no-img-element */
import { db, linksTable, usersTable } from "@dansr/common-db";
import { formatDistanceToNow } from "date-fns";
import { eq, getTableColumns } from "drizzle-orm";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

function formatAmount(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export async function GET(
    req: NextRequest,
    { params }: { params: { linkId: string } }
) {
    try {
        let { linkId } = params;
        linkId = linkId.split(".")[0];

        const [link] = await db
            .select({
                ...getTableColumns(linksTable),
                creator: getTableColumns(usersTable),
            })
            .from(linksTable)
            .where(eq(linksTable.id, linkId))
            .innerJoin(usersTable, eq(linksTable.creatorId, usersTable.id));

        if (!link) {
            throw new Error("Link not found!");
        }

        const imageResponse = new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#2D005D",
                        fontFamily: "sans-serif",
                        color: "white",
                        padding: "40px",
                    }}
                >
                    <h1 style={{ fontSize: 48, marginBottom: "20px" }}>
                        Bid for @{link.creator.xHandle} attention
                    </h1>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "20px",
                            width: "100%",
                            maxWidth: "800px",
                        }}
                    >
                        <InfoItem
                            label="Base Amount"
                            value={formatAmount(link.baseAmount)}
                            icon="💰"
                        />
                        <InfoItem
                            label="Number of Bids"
                            value={link.numberOfBids.toString()}
                            icon="🔢"
                        />
                        <InfoItem
                            label="Expires"
                            value={formatDistanceToNow(
                                new Date(link.expiresAt),
                                { addSuffix: true }
                            )}
                            icon="⏳"
                        />
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );

        const arrayBuffer = await imageResponse.arrayBuffer();

        return new NextResponse(arrayBuffer, {
            headers: {
                "Content-Type": "image/png",
                // "Cache-Control": "public, max-age=43200, s-maxage=43200",
            },
        });
    } catch (error) {
        console.error("Error in OG image generation:", error);
        return NextResponse.json({ error }, { status: 500 });
    }
}

function InfoItem({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: string;
}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "16px",
            }}
        >
            <div style={{ fontSize: 36, marginBottom: "8px" }}>{icon}</div>
            <div
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: "4px",
                }}
            >
                {label}
            </div>
            <div style={{ fontSize: 16 }}>{value}</div>
        </div>
    );
}
