import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { config } from "./config.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ddbDeleteEmbFromAllContests } from "./ddb.js";

let { client } = config

let collections = [
  // "ah-00000000-3a7b-2023-06-arrakis",
  // "ah-00000000-85ab-findings",
  "ah-00000000-fc9d-findings", // this will delete only fc9d c_embs_s from ddb findings

  // unused chroma (for now)
  // "ah-00000000-88a2-findings",
  // "ah-00000000-7722-findings"
  // unused
  // "ah-00000000-3a7b-findings",
  // "ah-00000000-8b70-findings",
]

for (let collection of collections) {
  console.log(`deleting collection ${collection}`);
  await client.deleteCollection({ name: collection })

  if (!collection.includes("findings")) {
    let contestName = collection.split("-").slice(3).join("-")
    try {
      let table = "ah_contest_2"

      let input: UpdateCommandInput = {
        TableName: table,
        Key: {
          pk: `${contestName}`,
          sk: "0"
        },
        UpdateExpression: "set em_stored = :em_stored",
        ExpressionAttributeValues: {
          ":em_stored": false
        }
      }

      let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))

      await client.send(new UpdateCommand(input))

    }
    catch (e) {
      console.log(`didn't delete from aws: ${e}`)
    }
  }
  else {
    await ddbDeleteEmbFromAllContests(collection.split("-")[2])
  }
}

console.log("done");
process.exit(0)