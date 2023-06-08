import { Embeddings } from "langchain/embeddings/base"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { CohereEmbeddings } from "langchain/embeddings/cohere"
import { CHROMA_URL } from "../config.js"

process.env.CHROMA_DB_URL = CHROMA_URL

export type EmbeddingsConf = {
  embeddings: (index?: number) => Embeddings
  model: string // sha256 4 byte index of the model
  putLimit: number
}

let openAiEmbeddings = {
  embeddings: () => new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_TOKEN,
    modelName: "text-embedding-ada-002"
  }),
  model: "8b70",
  putLimit: 499
}

let cohereToken = (index?: number) => {
  if (index === undefined) index = Math.floor(Math.random() * 3)

  switch (index) {
    case 1: return process.env.COHERE_TOKEN_FREE_2 ?? ""
    case 2: return process.env.COHERE_TOKEN_FREE_3 ?? ""
    default: return process.env.COHERE_TOKEN_FREE ?? ""
  }
}

let cohereEmbeddings = {
  embeddings: (index?: number) => new CohereEmbeddings({
    apiKey: cohereToken(index),
    modelName: "large"
  }),
  model: "3a7b",
  putLimit: 220
}

export let temperature = 0.7

export let embeddings = cohereEmbeddings as EmbeddingsConf