import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { EmbType, config, getEmbeddings } from "./config.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

let { client } = config

let contestNames = ["2023-05-party",
  "2023-04-frankencoin",
  "2023-04-caviar",
  "2023-05-blueberry",
  "2023-04-jojo",
  "2023-05-ecoprotocol",
  "2023-05-dodo",
  "2023-04-blueberry"]


export const deleteContest = async (contestName: string) => {
  let embTypes: EmbType[] = [
    // "85ab",
    // "fc9d",
    // "88a2",
    // "7722"
  ]

  let collections = embTypes.map(it => `ah-00000000-${it}-findings`)

  for (let i = 0; i < embTypes.length; i++) {
    let collectionName = collections[i]

    let collection = await client.getCollection({
      name: collectionName,
      embeddingFunction: getEmbeddings(embTypes[i])
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
}

const deleteAll = async () => {
  for (let i = 0; i < contestNames.length; i++) {
    let contestName = contestNames[i]
    await deleteContest(contestName)
  }
}

await deleteAll()

console.log("done");
process.exit(0)