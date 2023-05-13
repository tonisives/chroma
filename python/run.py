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
  # 2023-05-13 01:40:35 INFO     uvicorn.access  172.21.0.1:46890 - "GET /api/v1/collections/my_collection HTTP/1.1" 500
  # 2023-05-13 01:40:35 WARNING  chromadb.api.models.Collection No embedding_function provided, using default embedding function: SentenceTransformerEmbeddingFunction
  # 2023-05-13 01:40:35 ERROR    chromadb.server.fastapi Unable to load weights from pytorch checkpoint file for '/root/.cache/torch/sentence_transformers/sentence-transformers_all-MiniLM-L6-v2/pytorch_model.bin' at '/root/.cache/torch/sentence_transformers/sentence-transformers_all-MiniLM-L6-v2/pytorch_model.bin'. If you tried to load a PyTorch model from a TF 2.0 checkpoint, please set from_tf=True.
  # T
  print(f"existing collection {collection}")
except:
  collection = None

if collection is None:
  collection = client.create_collection(name="my_collection", embedding_function=openai_ef)

  new_item = openai_ef(["hello world"])
  print(f"add {item}")
  collection.add_item(item=new_item, id="id1")
  # collection.add_item(item=item, id="id1")

count = collection.count()
print(f"count {count}")



print("finished")