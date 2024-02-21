import { Keypair, Connection, Commitment, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createMint } from '@solana/spl-token';
import wallet from "../dev-wallet.json"
import mintPair from "../mint-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey, publicKeyBytes } from "@metaplex-foundation/umi";
// Import our keypair from the wallet file
const mintAddress = Keypair.fromSecretKey(new Uint8Array(mintPair));
//const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
// const connection = new Connection("https://api.devnet.solana.com",commitment);
const umi = createUmi('https://api.devnet.solana.com'); // conenction 
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

const tokenMetadataProgramId = publicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'); // umi pubkey wrapper


const mtp = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');


(async () => {
    try {
        const seed = [
            Buffer.from('metadata'),
            mtp.toBuffer(), //  metadata program id
            mintAddress.publicKey.toBuffer(),
        ];
        const [pda, bump] = await umi.eddsa.findPda(tokenMetadataProgramId,seed);
        // CreateMetadataAccountV3InstructionAccounts
        let accounts: CreateMetadataAccountV3InstructionAccounts = { 
            metadata: publicKey(pda),
            mint: publicKey(mintAddress.publicKey),
            mintAuthority: signer,
            payer: signer,
            updateAuthority: publicKey(keypair.publicKey),
        }

        let splTokenData : DataV2Args = {
            name: 'WBA Token q1 2024',
            symbol: 'WTQ2024',
            uri: 'https://arweave.net/QPC6FYdUn-3V8ytFNuoCS85S2tHAuiDblh6u3CIZLsw',
            sellerFeeBasisPoints: 0,
            collection:null,
            creators: null,
            uses: null
        };
       
        const args: CreateMetadataAccountV3InstructionArgs = {
            data: splTokenData,
            isMutable: true,
            collectionDetails: null
        }

        const tx = createMetadataAccountV3(umi,
            {
                ...accounts,
                ...args
            }
        );

        const hash = await tx.sendAndConfirm(umi);
        console.log(`Transaction hash: ${hash.signature.toString()}`);
        
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()