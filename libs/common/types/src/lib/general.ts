import type { UseFormRegister } from "react-hook-form";
import type { IconType } from "react-icons";

export type SolanaNetwork = "mainnet-beta" | "devnet";

export type ApiResponseType<ResultType> = {
    responseId: string;
    success: boolean;
    message: string;
    result: ResultType;
};

export type Register = UseFormRegister<Record<string, unknown>>;

export interface Option {
    value: string;
    label: string;
    icon?: IconType;
    logo_url?: string;
}
