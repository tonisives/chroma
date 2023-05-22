import { config } from "./config.js";
import embs from "./sample/embs.json";

let { client, collection_name, ef } = config

console.log("start");

let collection = await client.getOrCreateCollection(collection_name, undefined, ef)

console.log(`adding embs to ${collection.name}`);

await collection.add(
  embs.map((emb, i) => i.toString()),
  undefined,
  embs.map(it => it.metadata),
  embs.map(it => it.pageContent),
)

console.log("done");

process.exit(0)