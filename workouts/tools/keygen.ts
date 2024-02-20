import { Keypair } from "@solana/web3.js";
import fs from 'fs';



let kp = Keypair.generate();


console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`)
console.log(`Save the following keypair to a file and keep it secret!`);

// write the keypair to a file
fs.writeFileSync('dev-wallet.json',`[${kp.secretKey}]`);
