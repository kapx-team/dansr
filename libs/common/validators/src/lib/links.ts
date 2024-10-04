import { z } from "zod";

export const generateLinkSchema = z.object({
    name: z
        .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
        .min(1, {
            message: "Name is required",
        })
        .max(50, {
            message: "Name must be between 1 and 50 characters",
        })
        .optional(),
    tokenMint: z
        .string({
            required_error: "Token Mint is required",
            invalid_type_error: "Token Mint must be a string",
        })
        .min(1, {
            message: "Token Mint is required",
        })
        .max(44, {
            message: "Token Mint must be between 1 and 44 characters",
        }),
    baseAmount: z
        .number({
            required_error: "Base Amount is required",
            invalid_type_error: "Base Amount must be a number",
        })
        .min(0, {
            message: "Base Amount must be greater than 0",
        }),
    walletAddress: z
        .string({
            required_error: "Wallet Address is required",
            invalid_type_error: "Wallet Address must be a string",
        })
        .min(1, {
            message: "Wallet Address is required",
        })
        .max(44, {
            message: "Wallet Address must be between 1 and 44 characters",
        }),
    numberOfBids: z
        .number({
            required_error: "Number of Bids is required",
            invalid_type_error: "Number of Bids must be a number",
        })
        .min(0, {
            message: "Number of Bids must be greater than 0",
        }),
    expiration: z.enum(["1h", "3h", "6h", "12h", "1d", "2d"], {
        message:
            "Expiration must be one of the following: 1h, 3h, 6h, 12h, 1d, 2d",
    }),
});

export type CreateLinkSchema = z.infer<typeof generateLinkSchema>;
