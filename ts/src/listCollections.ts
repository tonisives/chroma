import { config } from "./config.js";

let { client, collection_name, ef } = config

console.log(`listing collections `);

let collections = await client.listCollections()

console.log(`collections count: ${collections.length}`);

for (let i = 0; i < collections.length; i++) {
  console.log("\n--------\n")
  console.log(`collection: ${collections[i].name}`);
  // let obj = await client.getCollection(collections[i])
  // let count = await obj.count()
  // console.log(`items count: ${count}`);

  // if (collections[i].name.includes("findings")) {
  // let items = await obj.peek({ limit: 3 })
  // console.log(`peek: ${JSON.stringify(items, undefined, 2)}`);
  // }
}

process.exit(0)