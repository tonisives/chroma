import { config } from "./config.js"

let { client, collection_name, ef } = config

let contest = process.argv[2]

if (!contest) {
  console.log("usage: tsx getCount.ts <contest>")
  process.exit(1)
}

console.log(contest)

let collection = await client.getCollection({
  name: `ah-00000000-8a3f-${contest}`,
})

console.log(`getting count for ${collection.name}`)

let result = await collection.count().catch((e) => {
  console.log(e)
  return 0
})

console.log(`count: ${result}`)

console.log(
  `sample ${JSON.stringify(await collection.peek({ limit: 4 }), null, 2)}`
)

process.exit(0)
