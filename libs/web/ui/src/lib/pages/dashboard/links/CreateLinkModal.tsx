"use client";

import { Button, ToastNotification } from "@dansr/common-ui";
import { extractErrorMessage, logError } from "@dansr/common-utils";
import { generateLinkSchema } from "@dansr/common-validators";
import { useCreateLink } from "@dansr/web-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import { Controller, useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";

type CreateLinkFormData = z.infer<typeof generateLinkSchema>;

type CreateLinkModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const TOKEN_MINTS = [
    {
        mint: "So11111111111111111111111111111111111111112",
        token: "SOL",
    },
    {
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        token: "USDC",
    },
    {
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        token: "USDT",
    },
];

export function CreateLinkModal({ open, onOpenChange }: CreateLinkModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<CreateLinkFormData>({
        resolver: zodResolver(generateLinkSchema),
    });

    const createLinkMutation = useCreateLink();

    async function handleCreateLink(data: CreateLinkFormData) {
        const toast = new ToastNotification("create-link");

        try {
            toast.loading("Creating link...");

            const response = await createLinkMutation.mutateAsync(data);

            if (!response.success) {
                throw new Error(response.message);
            }

            toast.success("Link created successfully");
            reset();
            onOpenChange(false);
        } catch (error) {
            logError("handleCreateLink =>", error);
            toast.error(extractErrorMessage(error, "Failed to create link!"));
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-20" />
                <Dialog.Content className="text-black z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
                    <Dialog.Title className="text-lg font-semibold mb-4">
                        Create New Link
                    </Dialog.Title>
                    <form
                        onSubmit={handleSubmit(handleCreateLink)}
                        className="space-y-4"
                    >
                        <div>
                            <Label.Root
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Name (Optional)
                            </Label.Root>
                            <input
                                id="name"
                                {...register("name", {
                                    setValueAs: (value) => value || undefined,
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label.Root
                                htmlFor="tokenMint"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Token Mint
                            </Label.Root>
                            <Controller
                                name="tokenMint"
                                control={control}
                                render={({ field }) => (
                                    <Select.Root
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <Select.Trigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <Select.Value placeholder="Select token mint" />
                                        </Select.Trigger>
                                        <Select.Portal>
                                            <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg z-40">
                                                <Select.Viewport>
                                                    {TOKEN_MINTS.map(
                                                        (option) => (
                                                            <Select.Item
                                                                key={
                                                                    option.mint
                                                                }
                                                                value={
                                                                    option.mint
                                                                }
                                                                className="text-black px-3 py-2 focus:bg-primary-1/50 focus:outline-none cursor-pointer"
                                                            >
                                                                <Select.ItemText>
                                                                    {
                                                                        option.token
                                                                    }{" "}
                                                                </Select.ItemText>
                                                            </Select.Item>
                                                        )
                                                    )}
                                                </Select.Viewport>
                                            </Select.Content>
                                        </Select.Portal>
                                    </Select.Root>
                                )}
                            />
                            {errors.tokenMint && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.tokenMint.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label.Root
                                htmlFor="baseAmount"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Base Amount
                            </Label.Root>
                            <input
                                id="baseAmount"
                                type="number"
                                {...register("baseAmount", {
                                    valueAsNumber: true,
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.baseAmount && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.baseAmount.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label.Root
                                htmlFor="walletAddress"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Wallet Address
                            </Label.Root>
                            <input
                                id="walletAddress"
                                {...register("walletAddress")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.walletAddress && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.walletAddress.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label.Root
                                htmlFor="numberOfBids"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Number of Bids
                            </Label.Root>
                            <input
                                id="numberOfBids"
                                type="number"
                                {...register("numberOfBids", {
                                    valueAsNumber: true,
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.numberOfBids && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.numberOfBids.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label.Root
                                htmlFor="expiration"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Expiration
                            </Label.Root>
                            <Controller
                                name="expiration"
                                control={control}
                                render={({ field }) => (
                                    <Select.Root
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <Select.Trigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <Select.Value placeholder="Select expiration" />
                                        </Select.Trigger>
                                        <Select.Portal>
                                            <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg z-40">
                                                <Select.Viewport>
                                                    {[
                                                        "1h",
                                                        "3h",
                                                        "6h",
                                                        "12h",
                                                        "1d",
                                                        "2d",
                                                    ].map((option) => (
                                                        <Select.Item
                                                            key={option}
                                                            value={option}
                                                            className="text-black px-3 py-2 focus:bg-primary-1/50 focus:outline-none cursor-pointer"
                                                        >
                                                            <Select.ItemText>
                                                                {option}
                                                            </Select.ItemText>
                                                        </Select.Item>
                                                    ))}
                                                </Select.Viewport>
                                            </Select.Content>
                                        </Select.Portal>
                                    </Select.Root>
                                )}
                            />
                            {errors.expiration && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.expiration.message}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2 mt-6">
                            <Button
                                type="button"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={createLinkMutation.isPending}
                            >
                                Create Link
                            </Button>
                        </div>
                    </form>
                    <Dialog.Close asChild>
                        <button
                            className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                            aria-label="Close"
                        >
                            <RxCross2 className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
