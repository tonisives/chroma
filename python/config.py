from chromadb.utils import embedding_functions
import os
import hashlib


def calculate_sha256_hash(string):
    sha256_hash = hashlib.sha256()
    sha256_hash.update(string.encode("utf-8"))
    return sha256_hash.hexdigest()[:4]


model_name = "text-embedding-ada-002"
# sha256 hash
model_hash = calculate_sha256_hash(model_name)

collection_name = f"ah-00000000-{model_hash}-2023-05-juicebox"

ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.environ.get("OPENAI_API_KEY"), model_name=model_name
)
