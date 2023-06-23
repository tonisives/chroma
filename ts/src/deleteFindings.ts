import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { config } from "./config.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

let { client, collection_name, ef } = config

let contestName = "2023-05-blueberry"

console.log(`deleting findings ${collection_name}`);

let collections = [
  "ah-00000000-85ab-findings",
  "ah-00000000-fc9d-findings",
  "ah-00000000-88a2-findings",
  "ah-00000000-7722-findings"
  // unused
  // "ah-00000000-3a7b-findings",
  // "ah-00000000-8b70-findings",
]


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
try {
  let table = "ah_finding_7"

  let input: UpdateCommandInput = {
    TableName: table,
    Key: {
      pk: `${contestName}`
    },
    UpdateExpression: "remove c_embs_s",
  }

  let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))
  await client.send(new UpdateCommand(input))
}
catch (e) {
  console.log(`didn't delete from aws: ${e}`)
}


console.log("done");
process.exit(0)