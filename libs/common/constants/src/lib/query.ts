export const REACT_QUERY_KEYS = {
    AUTHENTICATED_USER: ["authenticated-user"],
    CREATOR_LINKS: (creatorId: string) => ["creator-links", { creatorId }],
    LINK_BIDS: (linkId: string) => ["link-bids", { linkId }],
} as const;
