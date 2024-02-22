import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js"
import wallet from "../dev-wallet.json"


const keypair = Keypair.fromSecretKey(Uint8Array.from(wallet))
const connection = new Connection("https://api.devnet.solana.com");


const balance = async () => {
    try {
        const balance = await connection.getBalance(keypair.publicKey);
        console.log(`Balance: ${balance/LAMPORTS_PER_SOL} SOL`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
}

balance();