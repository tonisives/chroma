
import { Document } from "langchain/dist/document.js";
import { MarkdownTextSplitter } from "langchain/text_splitter"

export let split = async (docs: Document[]): Promise<Document[]> => {
  let blocks = [] as Document[];

  for (let i = 0; i < docs.length; i++) {
    let doc = docs[i];

    if (doc.metadata.source.endsWith(".md")) {
      let mdDocs = await splitMd(doc)
      blocks = blocks.concat(mdDocs)
      continue
    }

    let doc_url = doc.metadata.source
    let lines = [];
    let block_url: any = 0;
    let fileContent = doc.pageContent

    try {
      let fileLines = fileContent.split('\n');
      for (let linenum = 0; linenum < fileLines.length; linenum++) {
        let line = fileLines[linenum].trim();
        if (line.length === 0) {
          if (lines.length === 0) continue;

          let text = lines.join(' ');
          if (text.trim().length === 0) {
            continue;
          }

          doc_url = doc_url;

          let doc = {
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
          }

          blocks.push(doc);
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
      console.error("cannot parse (non-text?) file", doc_url);
    }
  }

  return blocks
}


let mdSplitter = new MarkdownTextSplitter()
let splitMd = async (doc: Document): Promise<Document[]> => {
  let docs = await mdSplitter.createDocuments([doc.pageContent], [doc.metadata])
  return docs
}

const findMatchingRecursiveDoc = (recursiveDocs: Document[], doc: Document): Document | void => {
  let found = recursiveDocs.find(rd => {
    let rRange = rd.metadata.loc.lines
    let range = doc.metadata.loc.lines
    return rd.metadata.source === doc.metadata.source &&
      rRange.from <= range.from &&
      rRange.to >= range.to
  })

  if (found) {
    return found
  }
}