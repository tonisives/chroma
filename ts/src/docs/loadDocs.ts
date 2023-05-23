import fs from "fs";
import path from 'path';

import { Document } from "langchain/dist/document.js";
import { CharacterTextSplitter, MarkdownTextSplitter, RecursiveCharacterTextSplitter, TextSplitter } from "langchain/text_splitter"
import { DirectoryLoader, TextLoader } from "langchain/document_loaders"
import { printDocs } from "../terminal.js";
import { split } from "./splitDocs.js";

export const loadDocs = async (dirPath: string): Promise<Document[]> => {
  let docs: Document[] = [];

  let filePaths = getAllFilePaths(dirPath)

  let i = 5

  for (const filePath of filePaths) {
    try {
      let fileDocs = await new TextLoader(filePath).load()
      let splitDocs = await split(fileDocs)

      // docs = docs.concat(await parseFilesSplitter(filePath))

      docs = docs.concat(splitDocs)
    } catch (e) {
      console.log(`error loading ${filePath}: ${e}`);
    }
  }

  return docs;
};

function getAllFilePaths(directoryPath: string) {
  let filePaths = [] as string[];

  const files = fs.readdirSync(directoryPath);

  files.forEach(file => {
    if (file.startsWith(".")) return
    const filePath = path.join(directoryPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isFile()) {
      filePaths.push(filePath);
    }

    else if (fileStat.isDirectory()) {
      const nestedFilePaths = getAllFilePaths(filePath);
      filePaths = filePaths.concat(nestedFilePaths);
    }
  });

  return filePaths;
}

// this one is not as good as cohere python example. but better than RecursiveTextSplitter
export const parseFilesSplitter = async (filePath: string) => {
  let splitter = new CharacterTextSplitter({
    separator: "\n\n",
    chunkSize: 50, // this is the min chunk size. set it to quite low
    chunkOverlap: 10
  })

  const loader = new TextLoader(filePath);
  const loadedDocs = await loader.loadAndSplit(splitter);
  return loadDocs
}

export const createDocsRecursiveSplitter = async (filePaths: string[]) => {
  const splitter = new RecursiveCharacterTextSplitter({})
  let docs = [] as Document[]

  for (const filePath of filePaths) {
    const loader = new TextLoader(filePath);
    const loadedDocs = await loader.load();
    let split = await splitter.splitDocuments(loadedDocs)
    docs.push(...split)
  }

  return docs
}

