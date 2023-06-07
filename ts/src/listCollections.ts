import { config } from "./config.js";

let { client, collection_name, ef } = config


console.log(`listing collections `);

let collections = await client.listCollections()

console.log(`count: ${collections.length}`);

for (let i = 0; i < collections.length; i++) {
  console.log(collections[i].name);
}

process.exit(0)