import { QueryResponse } from "chromadb/dist/main/types.js"
import { oneYearBeforeTimestamp } from "./config.js"
import { logMarkdown } from "./terminal.js"

// ! just run the docs-ai to debug web query

export let prodUrl = "https://fvwiyv3mtx4hcjqjhjoh6idlra0blpvd.lambda-url.us-west-2.on.aws/"

export type WebFinding = {
  pk: string,
  name: string,
  platform: string
  dist: number,
  loc: {
    lines: {
      from: number,
      to: number
    }
  }
  severity?: number
  tags: string[] // always include at least "none"
  url?: string
  content?: string // md
  c_name?: string
}


export const queryWeb = async (query: string): Promise<QueryResponse> => {
  let embType = "7f50"

  let body = { index: `ah-00000000-${embType}-findings`, query: query, k: 10, date_from: oneYearBeforeTimestamp, severities: [2, 3] }

  let result = await fetch(prodUrl, {
    "headers": {
      "authorization": `Bearer ${process.env.AH_TOKEN}`,
    },
    "body": JSON.stringify(body),
    "method": "POST"
  }).catch(e => { })

  let findings: WebFinding[] = await result!.json()
  let chromaRes: QueryResponse = {
    documents: [],
    metadatas: []
  } as any

  findings.forEach((it) => {
    chromaRes.documents.push([it.content!])
    chromaRes.metadatas.push([{
      c_name: it.c_name ?? "",
      source: it.url ?? "",
      locFrom: it.loc.lines.from,
      locTo: it.loc.lines.to,
      severity: it.severity ?? 0
    }])
  })

  return chromaRes
}

// print results
export const printResultWeb = (result: WebFinding[]) => {
  logMarkdown(`# start ${result.length} results`)

  for (let i = 0; i < result.length; i++) {
    // logMarkdown(`# --- ${result.metadatas?[0][i] }
    // ${result.metadatas[0][i].loc.lines.from}:${result.metadatas[0][i].loc.lines.to}`)
    logMarkdown(`# ${i}.`)
    // logMarkdown(result.documents[0][i] ?? "")
  }

  // let docLines = result.metadatas[0].map((it: any) => `${it.c_name}:${it.source} ${it.locFrom}:${it.locTo} ${it.severity}`).join("\n")
  // console.log(`\n\n${docLines}`)
}