import { client, collection_name, ef } from "./config.js";
import embs from "../embs.json";

console.log("getting collection");

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