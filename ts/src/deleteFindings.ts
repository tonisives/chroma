import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { EmbType, config } from "./config.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

let { client, collection_name, ef } = config

let contestName = "2023-05-dodo"
let embTypes: [EmbType] = [
  // "85ab",
  // "fc9d",
  "88a2"
  // "7722"
]

let collections = embTypes.map(it => `ah-00000000-${it}-findings`)

for (let collectionName of collections) {
  let collection = await client.getCollection({
    name: collectionName,
    embeddingFunction: ef
  })

  await collection.delete({
    where: {
      c_name: {
        $eq: contestName
      }
    }
  })
}

// also update em_stored in aws

const deleteEmbsS = async (embType: EmbType) => {
  try {
    let table = "ah_finding_7"

    let input: UpdateCommandInput = {
      TableName: table,
      Key: {
        pk: `${contestName}`
      },
      UpdateExpression: "delete c_embs_s :embs_s",
      ExpressionAttributeValues: {
        ":embs_s": new Set([embType])
      }
    }

    let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))
    await client.send(new UpdateCommand(input))
    console.log(`deleted ${embType} from aws`)
  }
  catch (e) {
    console.log(`didn't delete from aws: ${e}`)
  }
}

let deleteEmbs = embTypes.map(it => deleteEmbsS(it))
await Promise.all(deleteEmbs)


console.log("done");
process.exit(0)