import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { ulid } from "ulid";
import { logError } from "./log";

export function isBase64(value: string) {
    try {
        // Convert the string to a Buffer using the Base64 encoding
        const buffer = Buffer.from(value, "base64");

        // Check if the buffer can be encoded back to the original string
        return buffer.toString("base64") === value;
    } catch (error) {
        return false;
    }
}

export function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

export function capitalizeFirstLetter(str: string) {
    try {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (error) {
        logError("capitalizeFirstLetter =>", error);
        return str;
    }
}

export function formatDate(date?: string | Date, withTime = false) {
    try {
        if (date) {
            const dateObj = new Date(date);

            return format(
                dateObj,
                withTime ? "MMM dd, yyyy hh:mm a" : "MMM dd, yyyy"
            );
        }

        return "N/A";
    } catch (error) {
        return "N/A";
    }
}

export function formatTime(date?: string | Date) {
    try {
        if (date) {
            const dateObj = new Date(date);

            return format(dateObj, "hh:mm a");
        }

        return "N/A";
    } catch (error) {
        return "N/A";
    }
}

export function shortenText(str: string): string {
    try {
        return `${str.slice(0, 30)}...`;
    } catch (error) {
        return str;
    }
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function copyToClipboard(text: string, toast?: any) {
    try {
        await navigator.clipboard.writeText(text);
        if (toast) {
            toast.success("Copied to clipboard!");
        }
        return true;
    } catch (error) {
        logError("copyToClipboard =>", error);
        if (toast) {
            toast.error("Failed to copy to clipboard!");
        }
        return false;
    }
}

export function extractErrorMessage(error: unknown, fallbackMessage?: string) {
    let errorMessage =
        fallbackMessage ?? "Something went wrong! Please try again.";

    try {
        if (error instanceof Error && error?.message) {
            errorMessage = error.message;
        }

        return errorMessage;
    } catch (error) {
        return errorMessage;
    }
}

export async function blobToBase64DataURL(blob: Blob) {
    return new Promise((resolvePromise) => {
        const reader = new FileReader();
        reader.onload = () => resolvePromise(reader.result);
        reader.readAsDataURL(blob);
    });
}

export const generateId = () => {
    return ulid().toLowerCase();
};
