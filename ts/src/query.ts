import { config } from "./config.js";
import { logMarkdown } from "./terminal.js";

let { client, collection_name, ef } = config

console.log(`querying collection ${collection_name}`);

let collection = await client.getOrCreateCollection(collection_name, undefined, ef)

let result = (await collection.query(undefined, 10, undefined, "Where are the tokens swapped?"))

if (result.error) {
  console.log(`error: ${result.message}`)
  process.exit(1)
}

// results = results.map(it => {
//   return {
//     ...it,
//     documents: it.documents.map(it => it.replace(/\\n/g, '\n'))
//   }
// })

// console.log(`results: ${JSON.stringify(result, undefined, 2)}`);

// print results
logMarkdown("# start")

for (let i = 0; i < result.documents[0].length; i++) {
  logMarkdown(`# --- ${result.metadatas[0][i].source} ${result.metadatas[0][i].loc.lines.from}:${result.metadatas[0][i].loc.lines.to}`)
  logMarkdown(result.documents[0][i])
}

let docLines = result.metadatas[0].map((it: any) => `${it.source} ${it.loc.lines.from}:${it.loc.lines.to}`).join("\n")
console.log(`\n\n${docLines}`)


process.exit(0)