import { apiEnv } from "@dansr/api-env";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export function getDansrBidsWalletAndKeypair() {
    const keypair = Keypair.fromSecretKey(
        bs58.decode(apiEnv.DANSR_BIDS_WALLET_PRIVATE_KEY)
    );

    return { keypair, wallet: new PublicKey(keypair.publicKey) };
}
