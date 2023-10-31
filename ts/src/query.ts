import { QueryResponse } from "chromadb/dist/main/types.js";
import { config, getEmbeddings, oneYearBeforeTimestamp } from "./config.js";
import { logMarkdown } from "./terminal.js";
import Logger from "jst-logger";
import { queryWeb } from "./query.web.js";

let { client } = config

let collection = await client.getOrCreateCollection({
  // name: "ah-00000000-3a7b-2023-07-pooltogether",
  name: "ah-00000000-8a3f-2023-10-the-wildcat-protocol",
  // name: "ah-00000000-8a3f-2023-09-maia-dao-ulysses",
  embeddingFunction: getEmbeddings("8a3f")
})

let delayIndex = 0
const run = async () => {
  if (delayIndex > 0) await new Promise(resolve => setTimeout(resolve, 4000))

  Logger.debug(`querying ${collection.name}'s ${await collection.count()} documents`);

  await new Promise(resolve => setTimeout(resolve, 1000 * delayIndex++))

  process.stdout.write(`|`)

  let res = await queryLocal(`Ulysses`)

  process.stdout.write(`-`)

  if ((res as any).error) {
    console.log(`error: ${(res as any).error}`);
    process.exit(1)
  }

  return res
}

export const queryLocal = async (text: string) => {
  let queryInput = {
    nResults: 10,
    queryTexts: [text],
    where: {
      type: {
        $eq: 2
      }
      // $and: [
      //   {
      //     type: {
      //       $eq: 2
      //     }
      //   },
      //   {
      //     source: {
      //       $eq: "https://wildcat-protocol.gitbook.io"
      //     }
      //   }
      // ]
    }
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
    //     $gt: oneYearBeforeTimestamp
    //   }
    // }
    // where: {
    //   $and: [
    //     {
    //       c_date: {
    //         $gt: oneYearBeforeTimestamp
    //       }
    //     },
    //     {
    //       $or: [2, 3].map((it) => ({
    //         severity: {
    //           $eq: it
    //         }
    //       }))
    //     }
    //   ]
    // }
  }

  Logger.debug(`Querying chromadb with ${JSON.stringify(queryInput, null, 2)}`)

  let res = (await collection.query(queryInput))

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

run().then(results => {
  printResult(results)
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
    console.log(`${JSON.stringify(result.metadatas[0][i], null, 2)}`)
  }

  let docLines = result.metadatas[0].map((it: any) => `${it.source} ${it.locFrom}:${it.locTo} ${it.severity} `).join("\n")
  console.log(`\n\n${docLines}`)
}