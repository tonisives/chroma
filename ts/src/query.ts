import { config, openAiConfig } from "./config.js";
import { logMarkdown } from "./terminal.js";

let { client, collection_name, ef } = config

let query = "Where are the tokens transferred in code?"

console.log(`querying collection ${collection_name} for\n${query}`);

// let collection = await client.getOrCreateCollection({
//   name: collection_name,
//   embeddingFunction: ef
// })


let collection = await client.getOrCreateCollection({
  name: "ah-00000000-fc9d-findings",
  embeddingFunction: openAiConfig().ef
})

let result = (await collection.query({
  nResults: 10,
  queryTexts: [query]
}))

if ((result as any).error) {
  console.log(`error: ${(result as any).error}`);
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
  // logMarkdown(`# --- ${result.metadatas?[0][i] } ${result.metadatas[0][i].loc.lines.from}:${result.metadatas[0][i].loc.lines.to}`)
  logMarkdown(result.documents[0][i] ?? "")
}

let docLines = result.metadatas[0].map((it: any) => `${it.source} ${it.loc.lines.from}:${it.loc.lines.to}`).join("\n")
console.log(`\n\n${docLines}`)


process.exit(0)