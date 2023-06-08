import { config } from "./config.js";
import embs from "./sample/embs.json";

let { client, collection_name, ef } = config

console.log("start");

let collection = await client.getOrCreateCollection({
  name: collection_name,
  embeddingFunction: ef
})

console.log(`adding embs to ${collection.name}`);

await collection.add({
  ids: embs.map((emb, i) => i.toString()),
  metadatas: embs.map(it => {
    return {
      source: it.metadata.source,
      l_from: it.metadata.loc.lines.from,
      l_to: it.metadata.loc.lines.to,
    }
  }),
  documents: embs.map(it => it.pageContent),
}
)

console.log("done");

process.exit(0)