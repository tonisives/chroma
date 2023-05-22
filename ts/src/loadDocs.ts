import fs from "fs";
import path from 'path';

import { Document } from "langchain/dist/document.js";
import { CharacterTextSplitter } from "langchain/text_splitter"
import { TextLoader } from "langchain/document_loaders"



export const loadDocs = async (dirPath: string): Promise<Document[]> => {
  let docs: Document[] = [];

  const files = await fs.promises.readdir(dirPath);

  for (const file of files) {
    if (file.startsWith(".")) continue;
    const filePath = path.join(dirPath, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      const subDirectoryDocs = await loadDocs(filePath); // Recursively load files in subdirectory
      docs = docs.concat(subDirectoryDocs);
    } else if (stats.isFile()) {
      try {
        // docs = docs.concat(await parseFilesSplitter(filePath))

        docs = docs.concat(parseFilesManual(filePath))

      } catch (e) {
        console.log(`error loading ${file}: ${e}`);
      }
    }
  }

  return docs;
};

let splitter = new CharacterTextSplitter({
  separator: "\n\n",
  chunkSize: 50, // this is the min chunk size. set it to quite low
  chunkOverlap: 10
})
// this one is not as good as cohere python example. but better than RecursiveTextSplitter
export const parseFilesSplitter = async (filePath: string) => {
  const loader = new TextLoader(filePath);
  const loadedDocs = await loader.loadAndSplit(splitter);
  return loadDocs
}

function parseFilesManual(path: string): Document {
  var blocks = [] as Document[];

  var doc_url = path;
  var lines = [];
  var block_url: any = 0;
  var fileContent = fs.readFileSync(path, 'utf8')

  try {
    var fileLines = fileContent.split('\n');
    for (var linenum = 0; linenum < fileLines.length; linenum++) {
      var line = fileLines[linenum].trim();
      if (line.length === 0) {
        // blocks separated by blank lines, so write a new block.
        if (lines.length === 0) {
          continue; // skip empty 'blocks'.
        }

        var text = lines.join(' ');
        if (text.trim().length === 0) {
          continue;
        }

        doc_url = doc_url;

        blocks.push({
          pageContent: text,
          metadata: {
            source: doc_url,
            loc: {
              lines: {
                from: block_url,
                to: linenum
              }
            }
          }
        });
        // reset
        lines = [];
      } else {
        lines.push(line);
        if (lines.length === 1) {
          block_url = linenum + 1;
        }
      }
    }
  } catch (e) {
    console.log("cannot parse (non-text?) file", file);
  }

  return blocks;
}