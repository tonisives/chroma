import { QueryResponse } from "chromadb/dist/main/types.js";
import { config, getEmbeddings } from "./config.js";
import { logMarkdown } from "./terminal.js";
import Logger from "js-logger";

let { client } = config

let collection = await client.getOrCreateCollection({
  // name: "ah-00000000-3a7b-2023-07-pooltogether",
  name: "ah-00000000-7f50-findings",
  embeddingFunction: getEmbeddings("7f50")
})

let delayIndex = 0
const run = async () => {
  if (delayIndex > 0) await new Promise(resolve => setTimeout(resolve, 4000))

  Logger.debug(`querying ${collection.name}'s ${await collection.count()} documents for token transfer`);

  await new Promise(resolve => setTimeout(resolve, 1000 * delayIndex++))

  process.stdout.write(`|`)

  let res = (await collection.query({
    nResults: 10,
    queryTexts: ["nftx"],
    // where: {
    //   $or: [2, 3].map((it) => {
    //     return {
    //       severity: {
    //         $eq: it
    //       }
    //     }
    //   })
    // }
    // where: {
    //   c_date: {
    //     $gt: 0
    //   }
    // }
  }))

  process.stdout.write(`-`)

  if ((res as any).error) {
    console.log(`error: ${(res as any).error}`);
    process.exit(1)
  }

  return res
}

const runBatch = async () => {
  let jobs = []
  for (let i = 0; i < 5; i++) {
    let result = run().catch(e => {
      console.log(`error: ${(result as any).error}`);
      process.exit(1)
    })

    jobs.push(result)
  }

  return await Promise.all(jobs)
}

runBatch().then(results => {
  process.exit(0)
})

// print results
export const printResult = (result: QueryResponse) => {
  logMarkdown(`# start ${result.documents[0].length} results`)

  for (let i = 0; i < result.documents[0].length; i++) {
    // logMarkdown(`# --- ${result.metadatas?[0][i] }
    // ${result.metadatas[0][i].loc.lines.from}:${result.metadatas[0][i].loc.lines.to}`)
    logMarkdown(`# ${i}.`)
    logMarkdown(result.documents[0][i] ?? "")
  }

  let docLines = result.metadatas[0].map((it: any) => `${it.source} ${it.loc.lines.from}:${it.loc.lines.to}`).join("\n")
  console.log(`\n\n${docLines}`)
}