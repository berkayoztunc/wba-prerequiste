import { Keypair, Connection, Commitment, Transaction } from "@solana/web3.js";
import { createMint, createTransferInstruction, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import wallet from "../dev-wallet.json"
import mintPair from "../mint-wallet.json"

// Import our keypair from the wallet file
const mintAddress = Keypair.fromSecretKey(new Uint8Array(mintPair));
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com",commitment);

const someOne =  Keypair.generate();

(async () => {
    try {

       
        const myATA = await getOrCreateAssociatedTokenAccount(connection,keypair, mintAddress.publicKey,keypair.publicKey);
        const otherATA = await getOrCreateAssociatedTokenAccount(connection,keypair, mintAddress.publicKey,someOne.publicKey);
        // send some tokens to the other account
        const tx = new Transaction();
        tx.add(createTransferInstruction(
             myATA.address,
             otherATA.address,
             keypair.publicKey,
             10
        ))
        const signature = await connection.sendTransaction(tx, [keypair], {skipPreflight: true});
        console.log(`Transaction sent with signature: ${signature}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()