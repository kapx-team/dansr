import { apiEnv } from "@dansr/api-env";
import { Storage } from "@google-cloud/storage";

export const storage = new Storage({
    projectId: apiEnv.GCP_PROJECT_ID,
    credentials: {
        client_email: apiEnv.GCP_PROJECT_CLIENT_EMAIL,
        private_key: apiEnv.GCP_PROJECT_PRIVATE_KEY,
    },
});

export const getImageUrl = (path: string) => {
    // if (apiEnv.VERCEL_ENV === "production") {
    //     return `https://cdn.dansr.xyz/${path}`;
    // }

    return `https://storage.googleapis.com/${apiEnv.GCP_PROJECT_BUCKET}/${path}`;
};

const bucket = storage.bucket(apiEnv.GCP_PROJECT_BUCKET);

export const uploadFile = async (path: string, data: string | Buffer) => {
    const file = typeof data === "string" ? Buffer.from(data, "base64") : data;

    await bucket.file(path).save(file);

    return getImageUrl(path);
};
