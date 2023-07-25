import { DynamoDBDocumentClient, ScanCommand, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

let client = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export const downloadExistingContests = async () => {
  // get existing contests
  let query = new ScanCommand({
    TableName: "ah_contest_2",
    // sk == "0"
    FilterExpression: "sk = :sk",
    ExpressionAttributeValues: {
      ":sk": "0"
    }
  })

  let existingContests = (await client.send(query)).Items as any[]

  return existingContests
}

export const deleteEm = async (contest: any, index: number) => {
  if (index > 0) await new Promise(resolve => setTimeout(resolve, index * 50))

  console.log(`deleting ${contest.pk}`);

  try {
    let table = "ah_contest_2"

    let input: UpdateCommandInput = {
      TableName: table,
      Key: {
        pk: `${contest.pk}`,
        sk: "0"
      },
      UpdateExpression: "remove em_stored",
    }

    await client.send(new UpdateCommand(input))
  }
  catch (e) {
    console.log(`didn't delete from aws: ${e}`)
  }
}

let contests = await downloadExistingContests()

let jobs = contests.map((contest, index) => {
  return deleteEm(contest, index)
})

await Promise.all(jobs)

console.log("done");
process.exit(0)