import { Connection, Keypair, SystemProgram, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider, Address } from "@project-serum/anchor"
import { WbaPrereq, IDL } from "./idl"
import wallet from "../dev-wallet.json"

const keypair = Keypair.fromSecretKey(Uint8Array.from(wallet))
const connection = new Connection("https://api.devnet.solana.com");
const github = Buffer.from("berkayoztunc", "utf8");
const provider = new AnchorProvider(connection, new Wallet(keypair), {commitment: "confirmed"});
const program = new Program<WbaPrereq>(IDL,"HC2oqz2p6DEWfrahenqdq2moUcga9c9biqRBcdK3XKU1" as Address, provider);
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [PDAkey, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);
(async () => {
    try {
        const txhash = await program.methods
            .complete(github)
            .accounts({
                signer: keypair.publicKey,
                prereq: PDAkey,
                systemProgram: SystemProgram.programId,
            })
            .signers([
                keypair
            ])
            .rpc();
            console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
        } catch(e) {
            console.error(`Oops, something went wrong: ${e}`)
    }
})();