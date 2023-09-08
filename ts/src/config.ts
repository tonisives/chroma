import crypto from "crypto"
import { CohereEmbeddingFunction, OpenAIEmbeddingFunction } from 'chromadb'
import { ChromaClient } from 'chromadb'
import Logger from "jst-logger"

Logger.useDefaults()

export let CHROMA_URL = process.env.CHROMA_DB_URL
if (process.env.AWS_PROFILE === "prod") {
  console.warn("WARN: PROD URL")
}

let client = new ChromaClient({ path: CHROMA_URL })
export let contestName = "2023-05-Index"

console.log(`CHROMA_URL ${CHROMA_URL}`)
console.log(`AWS_PROFILE ${process.env.AWS_PROFILE}`)

export const calcHash = (input: string) => {
  return crypto.createHash('sha256').update(input).digest('hex').slice(0, 4)
}

export type Config = {
  client: ChromaClient,
  collection_name: string,
  ef: OpenAIEmbeddingFunction | CohereEmbeddingFunction
}

const openAiConfig = (): Config => {
  let model_name = "text-embedding-ada-002"
  let model_hash = calcHash(model_name)

  let collection_name = `ah-00000000-${model_hash}-${contestName}`

  let ef = new OpenAIEmbeddingFunction(
    {
      openai_api_key: process.env.OPENAI_TOKEN ?? "",
      openai_model: model_name
    }
  )

  return {
    client,
    collection_name,
    ef
  }
}

const cohereConfig = () => {
  let model_name = "cohere-large"
  let model_hash = calcHash(model_name)

  let collection_name = `ah-00000000-${model_hash}-${contestName}`

  let ef = new CohereEmbeddingFunction({
    cohere_api_key: process.env.COHERE_TOKEN ?? "",
    model: "large"
  })

  return {
    client,
    collection_name,
    ef
  }
}


export let config = cohereConfig()

// ---

export let embNames = {
  adaFull: "8b70",
  adaRecursive: "85ab",
  adaRecursive500: "7f50",
  adaCodeOnly: "fc9d",
  cohereFull: "3a7b",
  cohereRecursive: "88a2",
  cohereCodeOnly: "7722",
}

export const ALL_EMB_TYPES = [
  embNames.adaFull,
  embNames.adaRecursive,
  embNames.adaRecursive500,
  embNames.adaCodeOnly,
  embNames.cohereFull,
  embNames.cohereRecursive,
  embNames.cohereCodeOnly
]
export type EmbTuple = typeof ALL_EMB_TYPES
export type EmbType = EmbTuple[number]

export let getEmbeddings = (embType: EmbType): OpenAIEmbeddingFunction | CohereEmbeddingFunction => {
  switch (embType) {
    case "8b70": return openAiConfig().ef
    case "85ab": return openAiConfig().ef
    case "fc9d": return openAiConfig().ef
    case "3a7b": return cohereConfig().ef
    case "88a2": return cohereConfig().ef
    case "7722": return cohereConfig().ef
    default: return openAiConfig().ef
  }
}

let oneYearBefore = new Date()
oneYearBefore.setFullYear(oneYearBefore.getFullYear() - 1)
export let oneYearBeforeTimestamp = Math.floor(oneYearBefore.getTime() / 1000)
