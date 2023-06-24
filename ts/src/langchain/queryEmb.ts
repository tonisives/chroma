import { config, getEmbeddings } from "../config.js";
// import { Chroma } from "langchain/vectorstores/chroma"
import { logMarkdown } from "../terminal.js";
import { ChromaClient } from "chromadb";

let { client, collection_name, ef } = config

console.log("start");

// const chroma = new Chroma(embeddings.embeddings, {
//   collectionName: "ah-00000000-fc9d-findings",
//   url: process.env.CHROMA_DB_URL,
// })

// await chroma.ensureCollection()

// let results = await chroma.similaritySearch(query)
// let responseText = `${results.map((it) =>
//   `-- ${it.metadata.source}: line ${it.metadata.loc.lines.from}\n${it.pageContent}\n\n`)
//   .join("\n")}`

// langchain doesn't support chroma where query

let query = "token transfer"


let chroma = new ChromaClient({ path: process.env.CHROMA_DB_URL })
let collection = await chroma.getOrCreateCollection({
  name: "ah-00000000-88a2-findings",
  embeddingFunction: getEmbeddings("fc9d")
})

let date = Math.floor((new Date("2023-04")).getTime() / 1000)
let results = await collection?.query({
  queryTexts: [query],
  // where: {
  //   $and: [
  //     {
  //       c_date: {
  //         $gt: date
  //       }
  //     },
  //     {
  //       $or: [
  //         {
  //           severity: {
  //             $eq: 2
  //           }
  //         },
  //         {
  //           severity: {
  //             $eq: 3
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // } as any
})

if ((results as any).error) {
  console.log(`error: ${(results as any).error}`);
  process.exit(1)
}

let responseText = `${results?.documents[0].map((it, index) => ` -- ${index + 1}. ${JSON.stringify(results.metadatas[0][index], null, 2)}\n${it}`).join("\n")}`

logMarkdown(`## Query: ${query}`)
logMarkdown(responseText)

process.exit(0)