import { config } from "../config.js";
import { Chroma } from "langchain/vectorstores/chroma"
import { lcEmbeddings } from "./conf.js";

let { client, collection_name, ef } = config

console.log("start");

const chroma = new Chroma(lcEmbeddings.embeddings(), {
  collectionName: "ah-00000000-85ab-findings",
  url: process.env.CHROMA_DB_URL,
})

await chroma.ensureCollection()
let count = await chroma.collection?.count()

console.log(`done. ${count}`);

process.exit(0)