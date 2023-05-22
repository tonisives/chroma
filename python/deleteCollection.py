import chromadb
from chromadb.config import Settings
import os

import sys

from config import collection_name

print(f"delete:  {collection_name}")

# host = "localhost"
host = "18.246.10.12"

client = chromadb.Client(
    Settings(
        chroma_api_impl="rest", chroma_server_host=host, chroma_server_http_port="8000"
    )
)

client.delete_collection(name=collection_name)

print("finished")
