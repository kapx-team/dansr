import { apiEnv } from "@dansr/api-env";
import { Resend } from "resend";

const resend = new Resend(apiEnv.RESEND_API_KEY);

export default resend;
