import { config } from "./config.js";

let { client, collection_name, ef } = config

console.log(`getting count for ${collection_name}`);

let collection = await client.getCollection({
  name: collection_name,
})

let result = await collection.count().catch((e) => {
  console.log(e)
  return 0
})

console.log(`count: ${result}`);

process.exit(0)