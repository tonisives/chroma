import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions
import os
import json

import sys

#
collection_name = "ah-00000000-8b70-2023-05-juicebox"
embs = "./python/embs.json"

print(f"adding embs for {collection_name}")
# load array fo strings from  embs.json

with open("./python/embs.json") as f:
    embs = json.load(f)

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.environ.get("OPENAI_API_KEY"), model_name="text-embedding-ada-002"
)

# host = "localhost"
host = "18.246.10.12"

client = chromadb.Client(
    Settings(
        chroma_api_impl="rest", chroma_server_host=host, chroma_server_http_port="8000"
    )
)

try:
    collection = client.get_or_create_collection(
        name=collection_name, embedding_function=openai_ef
    )
    print(f"existing collection: {collection}")
except:
    collection = None
    print("failed to create a collection")
    exit(0)


# embeddings = openai_ef.generate(embs)

ids = list(map(lambda args: str(args[0]), enumerate(embs)))
docs = list(map(lambda args: args[1]["pageContent"], enumerate(embs)))
metadata = list(map(lambda args: args[1]["metadata"], enumerate(embs)))
metadata = list(
    map(
        lambda args: {
            "source": args[0]["source"],
        },
        metadata,
    )
)

print("adding and creating embeddings")
collection.add(ids=ids, documents=embs, metadatas=metadata)

print("finished")
