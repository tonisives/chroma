import { config } from "./config.js";

let { client, collection_name, ef } = config

console.log("querying collection");

let collection = await client.getOrCreateCollection(collection_name, undefined, ef)

let results = await collection.query(undefined, 5, undefined, "Where are the token transfers in Solidity functions?")

// results = results.map(it => {
//   return {
//     ...it,
//     documents: it.documents.map(it => it.replace(/\\n/g, '\n'))
//   }
// })

console.log(`results: ${JSON.stringify(results, undefined, 2)}`);

process.exit(0)