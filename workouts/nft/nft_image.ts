import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount, createGenericFile } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

import wallet from "../dev-wallet.json"
import base58 from "bs58";
import { readFile } from "fs/promises";
import { bundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(irysUploader());
umi.use(signerIdentity(myKeypairSigner));


(async () => {
    // file path
    const file = './image/jeefrug.png'
    // read file from path
    const fileBubber = await readFile(file);
    // create a generic file
    const image =  createGenericFile(fileBubber, 'jeefrug.png');
    // upload the file to irys
    const [url] = await umi.uploader.upload([image]);
    
    console.log("Your image URI: ", url);

})();