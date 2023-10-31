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

await deleteDEmbsS(contest, "0000")

async function deleteDEmbsS(contestName: string, embType: EmbType, index: number = -1) {
  try {
    let table = "ah_contest_2";

    let input: UpdateCommandInput = {
      TableName: table,
      Key: {
        pk: `${contestName}`,
        sk: "0"
      },
      UpdateExpression: "delete d_embs_s :embs_s",
      ExpressionAttributeValues: {
        ":embs_s": new Set([embType])
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