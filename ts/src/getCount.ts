import { config } from "./config.js";

let { client, collection_name, ef } = config

console.log(`getting count for ${collection_name}`);

let collection = await client.getCollection({
  name: "ah-00000000-fc9d-findings",
})

let result = await collection.count().catch((e) => {
  console.log(e)
  return 0
})

console.log(`count: ${result}`);

process.exit(0)