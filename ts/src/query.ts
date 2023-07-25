import { config, getEmbeddings } from "./config.js";
import { logMarkdown } from "./terminal.js";

let { client, collection_name, ef } = config

let collection = await client.getOrCreateCollection({
  // name: "ah-00000000-3a7b-2023-07-pooltogether",
  name: "ah-00000000-3a7b-2023-07-amphora-protocol",
  embeddingFunction: getEmbeddings("3a7b")
})

console.log(`querying ${collection.name}'s ${await collection.count()} documents for token transfer`);

let result = (await collection.query({
  nResults: 10,
  queryTexts: ["can anyone create a position in setToken? Or is it privileged?"],
  // where: {
  //   c_name: {
  //     $eq: "2023-05-dodo"
  //   }
  // }
  // queryTexts: [query]
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
logMarkdown(`# start ${result.documents[0].length} results`)

for (let i = 0; i < result.documents[0].length; i++) {
  // logMarkdown(`# --- ${result.metadatas?[0][i] }
  // ${result.metadatas[0][i].loc.lines.from}:${result.metadatas[0][i].loc.lines.to}`)
  logMarkdown(`# ${i}.`)
  logMarkdown(result.documents[0][i] ?? "")
}

let docLines = result.metadatas[0].map((it: any) => `${it.source} ${it.loc.lines.from}:${it.loc.lines.to}`).join("\n")
console.log(`\n\n${docLines}`)


process.exit(0)