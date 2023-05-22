import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions
import os
import json

import sys

from config import collection_name

query = "Token transfers in Solidity code."


print(f"querying for {collection_name}")

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
    collection = client.get_collection(
        name=collection_name, embedding_function=openai_ef
    )
    print(f"existing collection: {collection}")
except:
    collection = None
    print("collection doesn't exist")
    exit(0)

result = collection.query(
    n_results=5,
    query_texts=[query],
)

result_json = json.dumps(result, indent=2)
result_formatted = result_json.replace("\\n", "\n")

print(f"results: {result_formatted}")

print("finished")
