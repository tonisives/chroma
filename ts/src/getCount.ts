import { config } from "./config.js";

let { client, collection_name, ef } = config

console.log(`getting collection count`)

let collection = await client.getCollection({
  name: "ah-00000000-f059-findings",
})

console.log(`getting count for ${collection.name}`)

let result = await collection.count().catch((e) => {
  console.log(e)
  return 0
})

console.log(`count: ${result}`);

console.log(`sample ${JSON.stringify(await collection.peek({ limit: 4 }), null, 2)}`)

process.exit(0)