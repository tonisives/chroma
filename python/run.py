import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions
import os

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=os.environ.get("OPENAI_API_KEY"),
                model_name="text-embedding-ada-002"
            )

client = chromadb.Client(Settings(chroma_api_impl="rest",
                                        chroma_server_host="localhost",
                                        chroma_server_http_port="8000"
                                    ))

try:
  collection = client.get_collection(name="my_collection", embedding_function=openai_ef)
  print(f"existing collection: {collection}")
except:
  collection = None

if collection is None:
  print("existing is None, create a new collection")
  collection = client.create_collection(name="my_collection", embedding_function=openai_ef)

count = collection.count()

if count == 0:
  documents = ["hello world"]
  embeddings = openai_ef(documents)
  print(f"add embeddings: {embeddings.count()}")
  collection.add(
    documents=documents,
    embeddings=embeddings,
    metadatas=[{"name": "hello world"}],
    ids=["id1"]
  )

print(f"count {count}")



print("finished")