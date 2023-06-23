import crypto from "crypto"
import { CohereEmbeddingFunction, OpenAIEmbeddingFunction } from 'chromadb'
import { ChromaClient } from 'chromadb'
import cohere from "cohere-ai"

// export let CHROMA_URL = "http://18.246.10.12:8000"
export let CHROMA_URL = "https://6c6e-124-122-187-3.ngrok-free.app"
process.env.CHROMA_DB_URL = CHROMA_URL

let client = new ChromaClient({ path: CHROMA_URL })
export let contestName = "2023-05-Index"

console.log(`using chroma at ${CHROMA_URL}`)

export const calcHash = (input: string) => {
  return crypto.createHash('sha256').update(input).digest('hex').slice(0, 4)
}

export type Config = {
  client: ChromaClient,
  collection_name: string,
  ef: OpenAIEmbeddingFunction | CohereEmbeddingFunction
}

const openAiConfig = (): Config => {
  console.log("using openai")

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
  console.log("using cohere")
  let model_name = "cohere-large"
  let model_hash = calcHash(model_name)

  let collection_name = `ah-00000000-${model_hash}-${contestName}`

  let ef = new CohereEmbeddingFunction({
    cohere_api_key: process.env.COHERE_TOKEN ?? "",
    // model: "large"
  })

  return {
    client,
    collection_name,
    ef
  }
}


export let config = cohereConfig()

// ---

export const ALL_EMB_TYPES = [
  "85ab", // text-embedding-ada-002-recursive-split
  "fc9d", // text-embedding-ada-002-code-only
  "88a2", // cohere-large-recursive-split
  "7722", // cohere-large-code-only
  // unused
  // "8b70", // text-embedding-ada-002 (full)
  // "3a7b", // cohere-large (full)
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
    default: throw new Error(`unknown embType ${embType}`)
  }
}