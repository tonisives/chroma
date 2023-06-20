import { config } from "../config.js";
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
  name: "ah-00000000-fc9d-findings",
  embeddingFunction: ef
})

let date = Math.floor((new Date("2023-06")).getTime() / 1000)
let results = await collection?.query({
  queryTexts: [query],
  where: {
    "c_date": {
      "$lt": date
    }
  }
})

let responseText = `${results?.documents[0].map((it, index) => ` -- ${index + 1}. ${JSON.stringify(results.metadatas[0][index], null, 2)}\n${it}`).join("\n")}`



logMarkdown(`## Query: ${query}`)
logMarkdown(responseText)

process.exit(0)