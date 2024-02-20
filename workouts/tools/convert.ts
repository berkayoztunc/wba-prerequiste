import base58 from "bs58";
import fs from "fs";

let secretKey  = fs.readFileSync("dev-wallet.json", "utf-8");
console.log("you can add phantom that wallet via secret key ",base58.encode(JSON.parse(secretKey)));
