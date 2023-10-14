import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { EmbType, config, getEmbeddings } from "../config.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { deleteEmbsS } from "../ddb.js";

let { client } = config

let collection = await client.getCollection({
  name: "ah-00000000-8a3f-2023-10-safestaking-by-hopr",
  embeddingFunction: getEmbeddings("7f50")
})

let res = await collection.delete({
  where: {
    c_name: {
      $eq: "2023-07-perennial"
    }
  }
})

let contestNames = ["2022-08-prepo",
  "2022-09-nouns-builder"]

export const deleteContest = async (contestName: string) => {
  let embTypes: EmbType[] = [
    // "85ab",
    "fc9d",
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

  let deleteEmbs = embTypes.map(it => deleteEmbsS(contestName, it))
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