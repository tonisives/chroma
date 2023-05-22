import { config } from "./config.js";
import { loadDocs } from "./loadDocs.js";

let { client, collection_name, ef } = config

console.log("start");
let collection = await client.getOrCreateCollection(collection_name, undefined, ef)
console.log(`adding embs to ${collection.name}`);
let docs = await loadDocs("./src/sample/juicebox/")

let ids = docs.map((emb, i) => i.toString())
let metadatas = docs.map(it => it.metadata)
let pageContents = docs.map(it => it.pageContent)

/* 
import { logMarkdown } from "./terminal.js";
docs.forEach((it, i) => {
  logMarkdown(`# -- ${docs[i].metadata.source} ${docs[i].metadata.loc.lines.from}:${docs[i].metadata.loc.lines.to}`)
  let pageContent = docs[i].pageContent ?? ""
  console.log(pageContent)
}) */

// 240 = fail
let j = 0;
const increment = 230;
for (let i = 0; i < docs.length; i += increment) {
  j = Math.min(i + increment, docs.length);
  console.log(`adding ${i} : ${j}`);

  await collection.add(
    ids.slice(i, j),
    undefined,
    metadatas.slice(i, j),
    pageContents.slice(i, j)
  );
}

console.log("done. added " + docs.length + " docs");

process.exit(0)