export type ResendCreateBatchOption = {
    from: string;
    subject: string;
    to: string | string[];
    cc?: string | string[];
} & (
    | {
          html: string;
          text?: string;
      }
    | {
          html?: string;
          text: string;
      }
);
