import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, QueryCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { EmbType } from "./config.js";

let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export const ddbDeleteEmbFromAllContests = async (embType: EmbType) => {
  // get all contests
  let query: QueryCommandInput = {
    TableName: "ah_finding_7",
    IndexName: "contests_2",
    KeyConditionExpression: "c_c = :c_c and c_name > :c_name",
    ExpressionAttributeValues: {
      ":c_c": 1,
      ":c_name": "0"
    }
  }

  let contests = await client.send(new QueryCommand(query))

  console.log(`deleting c_embs_s ${embType} from ${contests.Items!.length} contests`);

  let jobs = contests.Items!.map((contest, index) => {
    return deleteEmbsS(contest.c_name, embType, index)
  })

  await Promise.all(jobs)
  // remove the emb stored
}

export const deleteEmbsS = async (contestName: string, embType: EmbType, index: number = -1) => {
  if (index > 0) await new Promise(resolve => setTimeout(resolve, index * 100))

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