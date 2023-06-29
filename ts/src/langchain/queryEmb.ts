import { EmbTuple, EmbType, config, getEmbeddings } from "../config.js";
// import { Chroma } from "langchain/vectorstores/chroma"
import { logMarkdown } from "../terminal.js";
import { ChromaClient } from "chromadb";

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

let query = "uint256[] memory _tradeAmounts = new uint256[](_tradeAssets.length);"

let emb: EmbType = "85ab" // 7722
let chroma = new ChromaClient({ path: process.env.CHROMA_DB_URL })
let collection = await chroma.getOrCreateCollection({
  // name: "ah-00000000-3a7b-2023-06-real-wagmi"
  name: `ah-00000000-${emb}-findings`
})
let ef = getEmbeddings(emb)

let embQuery = await ef.generate([query])

let date = Math.floor((new Date("2023-04")).getTime() / 1000)
let results = await collection?.query({
  queryEmbeddings: embQuery,
  // where: {
  //   c_date: {
  //     $gt: date
  //   }
  // }
  // where: {
  //   c_name: "2023-04-frankencoin"
  // }

  // where: {
  //   severity: {
  //     $eq: 2
  //   }
  // }


  where: {
    $and: [
      {
        c_date: {
          $gt: date
        }
      },
      {
        $or: [
          {
            severity: {
              $eq: 2
            }
          },
          {
            severity: {
              $eq: 3
            }
          }
        ]
      }
    ]
  }
})

if ((results as any).error) {
  console.log(`error: ${(results as any).error}`);
  process.exit(1)
}

let responseText = `${results?.documents[0].map((it, index) =>
  ` -- ${index + 1}. ${JSON.stringify(results.metadatas[0][index], null,
    2)}\n${it}`).join("\n")}`

// let responseText = `${results?.documents[0].map((it, index) =>
//   `${(results.metadatas[0][index] as any).source} - ${(results.metadatas[0][index] as any).loc.lines.from}`).join("\n")}`

logMarkdown(`## Query: ${query}`)
logMarkdown(responseText)

process.exit(0)