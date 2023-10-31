import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { EmbType, config, getEmbeddings } from "../config.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

let { client } = config
let contest = "ah-00000000-8a3f-2023-10-badger-ebtc-audit-certora-formal"

let collection = await client.getCollection({
  name: contest,
  embeddingFunction: getEmbeddings("8a3f")
})

let res = await collection.delete({
  where: {
    type: {
      $eq: 2
    }
  }
})

await deleteDEmbsS(contest.split("-").slice(3).join("-"), "0")

async function deleteDEmbsS(contestName: string, embType: string, index: number = -1) {
  console.log(`deleting d_embs_s ${embType} from ${contestName}`);

  try {
    let table = "ah_contest_2";

    let input: UpdateCommandInput = {
      TableName: table,
      Key: {
        pk: `${contestName}`
      },
      UpdateExpression: "delete d_embs_s :d_embs_s",
      ExpressionAttributeValues: {
        ":d_embs_s": new Set([embType])
      }
    };

    let client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
    await client.send(new UpdateCommand(input));
    console.log(`deleted ${embType} from aws`);
  }
  catch (e) {
    console.log(`didn't delete from aws: ${e}`);
  }
}

console.log("done");
process.exit(0)