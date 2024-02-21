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

        // get ATA

        // send 
        
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()