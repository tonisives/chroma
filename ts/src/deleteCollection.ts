import { DynamoDBDocumentClient, QueryCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { config, contestName } from "./config.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

let { client, collection_name, ef } = config

console.log(`deleting collection ${collection_name}`);

await client.deleteCollection(collection_name)


// also delete em_stored from aws

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

console.log("done");
process.exit(0)