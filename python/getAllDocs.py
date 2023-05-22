import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions
import os
import json

import sys

collection_name = sys.argv[1]

print(f"getting count for collection_name: {collection_name}")

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=os.environ.get("OPENAI_API_KEY"),
                model_name="text-embedding-ada-002"
            )

# host = "localhost"
host = "18.246.10.12"

client = chromadb.Client(Settings(chroma_api_impl="rest",
                                        chroma_server_host=host,
                                        chroma_server_http_port="8000"
                                    ))

try:
  collection = client.get_collection(name=collection_name, embedding_function=openai_ef)
  print(f"existing collection: {collection}")
except:
  collection = None
  print("collection doesn't exist")
  exit(0)


count = collection.count()
print(f"collection items count {count}")
items = collection.peek(100)

print(f"first 100 items:\n {json.dumps(items, indent=2)}")

print("finished")