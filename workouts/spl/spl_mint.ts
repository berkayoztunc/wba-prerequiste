import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../dev-wallet.json"
import mintPair from "../mint-wallet.json"

const mintAddress = Keypair.fromSecretKey(new Uint8Array(mintPair));
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;


(async () => {
    try {
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mintAddress.publicKey, keypair.publicKey);
        console.log(`Your ata is: ${ata.address.toBase58()}`);
        const mintTx = await mintTo(connection, keypair, mintAddress.publicKey, ata.address, keypair.publicKey, 100n * token_decimals);
        console.log(`Your mint txid: ${mintTx}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()