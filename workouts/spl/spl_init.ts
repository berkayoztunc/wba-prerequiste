import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../dev-wallet.json"
import mintPair from "../mint-wallet.json"

// Import our keypair from the wallet file
const mintAddress = Keypair.fromSecretKey(new Uint8Array(mintPair));
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com",commitment);

(async () => {
    try {
        
        // Create a new token mint
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey,
            null,
            6,
            mintAddress
        );
        console.log(`Success! Check out your mint here: https://explorer.solana.com/address/${mint}?cluster=devnet`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()