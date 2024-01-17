import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb"
import { config } from "../config.js"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { ddbDeleteEmbFromAllContests } from "../ddb.js"

let { client } = config
let withDdb = true

let collectionName = process.argv[2]

if (!collectionName) {
  console.log("Please input collection name")
  process.exit(1)
}

// verify
let input = await new Promise((resolve) => {
  process.stdout.write(
    `delete collection ${collectionName} (with ddb ${withDdb}? (y/n) `
  )
  process.stdin.on("data", (data) => {
    resolve(data.toString().trim())
  })
})

if (input !== "y") {
  console.log("not deleting")
  process.exit(0)
}

console.log(`deleting collection ${collectionName} with DDB ${withDdb}`)

// await client.deleteCollection({ name: collectionName })

/* let collection = await client.getOrCreateCollection({ name: collectionName })
  await collection.delete({}).catch(e => {
    console.log(`didn't delete from chroma: ${e}`)
    process.exit(1)
  }) */

if (!withDdb) {
  console.log("not deleting from ddb")
  process.exit(0)
}

if (!collectionName.includes("findings")) {
  let contestName = collectionName.split("-").slice(3).join("-")
  try {
    let table = "ah_contest_2"

    let input: UpdateCommandInput = {
      TableName: table,
      Key: {
        pk: `${contestName}`,
        sk: "0",
      },
      UpdateExpression: "remove em_stored",
    }

    let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))

    await client.send(new UpdateCommand(input))
  } catch (e) {
    console.log(`didn't delete from aws: ${e}`)
  }
} else {
  await ddbDeleteEmbFromAllContests(collectionName.split("-")[2])
}

console.log("done")
process.exit(0)
