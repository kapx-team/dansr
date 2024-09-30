export async function isLinkExpired(expiresAt: Date | string) {
    const isExpired = new Date(expiresAt) < new Date();

    return isExpired;
}
