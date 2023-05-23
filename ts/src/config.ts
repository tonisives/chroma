import crypto from "crypto"
import { CohereEmbeddingFunction, OpenAIEmbeddingFunction } from 'chromadb'
import { ChromaClient } from 'chromadb'
import cohere from "cohere-ai"

let client = new ChromaClient("http://18.246.10.12:8000")

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

  let collection_name = `ah-00000000-${model_hash}-2023-05-juicebox`

  let ef = new OpenAIEmbeddingFunction(
    process.env.OPENAI_TOKEN ?? "",
    model_name
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

  let collection_name = `ah-00000000-${model_hash}-2023-05-juicebox`

  let ef = new CohereEmbeddingFunction(
    process.env.COHERE_TOKEN ?? ""
  )

  return {
    client,
    collection_name,
    ef
  }
}


export let config = cohereConfig()

