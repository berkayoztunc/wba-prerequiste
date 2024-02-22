import wallet from "../dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

(async () => {
    try {

        const image = "https://arweave.net/0MT-xe8spMvWEJpt6__MHQUPwIPfR2bwS_0QfS0cgdw";
        // basic metadata structure for the NFT
        const metadata = {
            name: "Jeff Rug",
            symbol: "RUG",
            description: "Its not a rug but a shitty rug",
            image,
            attributes: [
                {trait_type: 'pepe', value: 'true'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://arweave.net/0MT-xe8spMvWEJpt6__MHQUPwIPfR2bwS_0QfS0cgdw"
                    },
                ]
            },
            creators: [
                {
                    address: keypair.publicKey,
                    share: 100
                }
            ]
        };
        // upload the metadata to bundlr
        const myMeta = await bundlrUploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myMeta);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();