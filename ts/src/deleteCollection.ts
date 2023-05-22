import { client, collection_name, ef } from "./config.js";

console.log("deleting collection");

await client.deleteCollection(collection_name)

console.log("done");
process.exit(0)