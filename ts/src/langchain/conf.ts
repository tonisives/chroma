import { Embeddings } from "langchain/embeddings/base"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { CohereEmbeddings } from "langchain/embeddings/cohere"

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

let cohereEmbeddings = {
  embeddings: () => {
    return new CohereEmbeddings({
      apiKey: process.env.COHERE_TOKEN,
      modelName: "large"
    })
  },
  model: "3a7b",
  putLimit: 220
}

export let temperature = 0.7

export let lcEmbeddings = openAiEmbeddings as EmbeddingsConf