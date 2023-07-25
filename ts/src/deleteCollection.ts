import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { config, embNames } from "./config.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ddbDeleteEmbFromAllContests } from "./ddb.js";

let { client } = config

let collections = [
  // contest - will remove em_stored from contests_2
  // `ah-00000000-${embNames.adaRecursive500}-2023-06-Index`,

  // -findings end: will delete only fc9d c_embs_s from ddb finding_7 contests
  "ah-00000000-85ab-findings",
  "ah-00000000-fc9d-findings",

  // unused cohere (for now)
  // "ah-00000000-88a2-findings",
  // "ah-00000000-7722-findings"
  // unused
  // "ah-00000000-3a7b-findings",
  // "ah-00000000-8b70-findings",
]


for (let collection of collections) {
  console.log(`deleting collection ${collection}`);
  await client.deleteCollection({ name: collection })
    .catch(e => {
      console.log(`didn't delete from chroma: ${e}`)
      process.exit(1)
    })

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
        UpdateExpression: "remove em_stored",
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