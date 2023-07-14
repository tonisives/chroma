import { config, getEmbeddings } from "./config.js";
import { logMarkdown } from "./terminal.js";

let { client, collection_name, ef } = config

let query = `        // verify that the op exists in the merkle tree
bytes32 hashedLeaf = keccak256(abi.encode(MANY_CHAIN_MULTI_SIG_DOMAIN_SEPARATOR_OP, op));
if (!MerkleProof.verify(proof, currentExpiringRootAndOpCount.root, hashedLeaf)) {
    revert ProofCannotBeVerified();
}`

console.log(`querying collection ${collection_name} for\n${query}`);

let collection = await client.getOrCreateCollection({
  name: "ah-00000000-fc9d-findings",
  embeddingFunction: getEmbeddings("fc9d")
})

let delayIndex = 0
const runQuery = async () => {
  if (delayIndex > 0) await new Promise(resolve => setTimeout(resolve, 1000))
  await new Promise(resolve => setTimeout(resolve, 1000 * delayIndex++))

  process.stdout.write(`|`)

  let dateWhere = {
    c_date: {
      $gt: 0
    }
  }

  let severityWhere = [2, 3].map((it) => {
    return {
      severity: {
        $eq: it
      }
    }
  })

  let where = {
    $and: [
      dateWhere,
      {
        $or: severityWhere
      }
    ]
  } as any

  let result = (await collection.query({
    nResults: 10,
    queryTexts: [query],
    // where: where
  }))

  process.stdout.write(`-`)
  return result
}

let jobs = []
for (let i = 0; i < 100; i++) {
  let result = runQuery().catch(e => {
    console.log(`error: ${(result as any).error}`);
    process.exit(1)
  })

  jobs.push(result)
}

let results = await Promise.all(jobs)
logMarkdown("# start")

process.exit(0)