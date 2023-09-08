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


export const fetchFindingsWeb = async (query: string): Promise<WebFinding[]> => {
  let embType = "7f50"

  let body = { index: `ah-00000000-${embType}-findings`, query: query, k: 10, date_from: oneYearBeforeTimestamp, severities: [2, 3] }

  let result = await fetch(prodUrl, {
    "headers": {
      "authorization": `Bearer ${process.env.AH_TOKEN}`,
    },
    "body": JSON.stringify(body),
    "method": "POST"
  }).catch(e => { })

  return await result!.json()
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