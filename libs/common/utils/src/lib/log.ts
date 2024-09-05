export function logMessage(message: string, data?: unknown) {
    if (data) {
        console.log(message, data);
    } else {
        console.log(message);
    }
}

export function logError(message: string, error: unknown) {
    const errorMessage = error instanceof Error ? error.message : null;

    console.error(message, { errorMessage, error });
}
