import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"
import wallet from "./dev-wallet.json"

const keypair = Keypair.fromSecretKey(Uint8Array.from(wallet))

const connection = new Connection("https://devnet.helius-rpc.com/?api-key=c5a42a15-bd1e-431e-a45d-f7336cdd2222");

(async () => {
    try {
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();