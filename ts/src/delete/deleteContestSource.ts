import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb"
import { config, getEmbeddings } from "../config.js"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

let { client } = config

let contest = process.argv[2]

if (!contest) {
  console.log("Please input contest name")
  process.exit(1)
}

let input = await new Promise((resolve) => {
  process.stdout.write(`delete ${contest} source code embs (type 0)? (y/n) `)
  process.stdin.on("data", (data) => {
    resolve(data.toString().trim())
  })
})

if (input !== "y") {
  console.log("not deleting")
  process.exit(0)
}

contest = `ah-00000000-8a3f-${contest}`

console.log(`deleting ${contest} source code embs (type 0)`)

let collection = await client.getCollection({
  name: contest,
  embeddingFunction: getEmbeddings("8a3f"),
})

let res = await collection.delete({
  where: {
    type: {
      $eq: 0,
    },
  },
})

console.log("delete res", res)

// you can use util-runs in docs-ai to ignore em-stored check
// await deleteEmStored(contest.split("-").slice(3).join("-"), "0")

async function deleteEmStored(
  contestName: string,
  embType: string,
  index: number = -1
) {
  console.log(`deleting d_embs_s ${embType} from ${contestName}`)

  try {
    let table = "ah_contest_2"

    let input: UpdateCommandInput = {
      TableName: table,
      Key: {
        pk: `${contestName}`,
      },
      UpdateExpression: "set em_stored :em_stored",
      ExpressionAttributeValues: {
        ":em_stored": 0,
      },
    }

    let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))
    await client.send(new UpdateCommand(input))
    console.log(`deleted ${embType} from aws`)
  } catch (e) {
    console.log(`didn't delete from aws: ${e}`)
  }
}

console.log("done")
process.exit(0)
