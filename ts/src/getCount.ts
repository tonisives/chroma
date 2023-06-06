import { config } from "./config.js";

let { client, collection_name, ef } = config


console.log(`getting count for ${collection_name}`);

let collection = await client.getCollection(collection_name)

let result = await collection.count()

if (result.error) {
  console.log(`error: ${result.message}`)
  process.exit(1)
}

console.log(`count: ${result}`);

process.exit(0)