import { DynamoDBDocumentClient, QueryCommand, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ddbDeleteEmbFromAllContests } from "../ddb.js";


let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export const downloadExistingContests = async () => {
  // get existing contests
  let query = new QueryCommand({
    TableName: "ah_finding_7",
    IndexName: "contests_2",
    KeyConditionExpression: "c_c = :c_c AND c_name > :c_name",
    ExpressionAttributeValues: {
      ":c_c": 1,
      ":c_name": "0"
    }
  })

  let existingContests = (await client.send(query)).Items as any[]

  return existingContests
}

export const deleteAddDate = async (contestName: string, index: number) => {
  if (index > 0) await new Promise(resolve => setTimeout(resolve, index * 50))

  console.log(`deleting c_add_date from ${contestName}`);

  try {
    let table = "ah_finding_7"

    let input: UpdateCommandInput = {
      TableName: table,
      Key: {
        pk: `${contestName}`
      },
      UpdateExpression: "remove c_add_date"
    }

    let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))
    await client.send(new UpdateCommand(input))
    console.log(`deleted c_add_date for ${contestName}`)
  }
  catch (e) {
    console.log(`didn't delete from aws: ${contestName} ${e}`)
  }
}

export const setAddDate = async (contest: any, index: number) => {
  if (index > 0) await new Promise(resolve => setTimeout(resolve, index * 50))

  console.log(`adding c_add_date from ${contest.pk}`);

  try {
    let table = "ah_finding_7"
    let date = contest.pk.split("-").slice(0, 2)
    let epoch = (new Date(parseInt(date[0]), parseInt(date[1]) - 1)).getTime() * 1000


    let input: UpdateCommandInput = {
      TableName: table,
      Key: {
        pk: `${contest.pk}`
      },
      UpdateExpression: "set c_add_date = :c_add_date",
      ExpressionAttributeValues: {
        ":c_add_date": epoch
      }
    }

    let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))
    await client.send(new UpdateCommand(input))
    console.log(`deleted c_add_date for ${contest.pk}`)
  }
  catch (e) {
    console.log(`didn't delete from aws: ${contest.pk} ${e}`)
  }
}

let contests = await downloadExistingContests()

let jobs = contests.map((contest, index) => {
  return setAddDate(contest, index)
})

await Promise.all(jobs)

console.log("done");
process.exit(0)