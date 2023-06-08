import { config } from "../config.js";
import embs from "../sample/embs.json";
import { Chroma } from "langchain/vectorstores/chroma"
import { embeddings } from "./conf.js";

let { client, collection_name, ef } = config

console.log("start");

const chroma = new Chroma(embeddings.embeddings(), {
  collectionName: collection_name,
  url: process.env.CHROMA_DB_URL,
})

await chroma.addDocuments(embs)

console.log("done");

process.exit(0)