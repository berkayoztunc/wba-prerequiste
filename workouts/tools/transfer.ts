import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js"
import wallet from "../dev-wallet.json"


const keypair = Keypair.fromSecretKey(Uint8Array.from(wallet))

const connection = new Connection("https://api.devnet.solana.com");


const to = new PublicKey("GLtaTaYiTQrgz411iPJD79rsoee59HhEy18rtRdrhEUJ");

(async () => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: to,
                lamports: LAMPORTS_PER_SOL / 100,
            })
        );
        transaction.feePayer = keypair.publicKey;
        const txhash = await sendAndConfirmTransaction(connection, transaction, [keypair]);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
(async () => {
    try {
        const balance = await connection.getBalance(keypair.publicKey);
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: to,
                lamports: balance / 2,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = keypair.publicKey;

        const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;
        transaction.instructions.pop();
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: to,
                lamports: balance - fee,
            })
        );
        const txhash = await sendAndConfirmTransaction(connection, transaction, [keypair]);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})