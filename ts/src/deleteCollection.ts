import { config } from "./config.js";

let { client, collection_name, ef } = config

console.log("deleting collection");

await client.deleteCollection(collection_name)

console.log("done");
process.exit(0)