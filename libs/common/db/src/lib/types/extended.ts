import type {
    SelectContactFormSubmission,
    SelectCreator,
    SelectLink,
    SelectLinkBid,
    SelectUser,
    SelectVerificationRequest,
} from ".";

export type User = SelectUser;

export type Creator = SelectCreator & {
    user: SelectUser;
};

export type VerificationRequest = SelectVerificationRequest & {
    creator: SelectCreator;
};

export type ContactFormSubmission = SelectContactFormSubmission;

export type Link = SelectLink & {
    token?: JupagToken;
};

export type LinkBid = SelectLinkBid & {
    link?: SelectLink;
};

export type JupagToken = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
    tags: string[];
    daily_volume: number;
    created_at: string;
    freeze_authority: string | null;
    mint_authority: string | null;
    permanent_delegate: string | null;
    minted_at: string | null;
    extensions: {
        coingeckoId: string;
    };
};
