// @ts-ignore
import markdown from 'markdown-it'
// @ts-ignore
import terminal from 'markdown-it-terminal'
import { Document } from "langchain/dist/document.js";

export const logMarkdown = (text: string) => {
  try {
    const md = markdown()
    md.use(terminal)
    console.log(md.render(text))
  } catch (e) {
    console.log(text)
  }
}

export const printDocs = (docs: Document[], markdown: boolean = true) => {
  docs.forEach((it, i) => {
    logMarkdown(`# -- ${docs[i].metadata.source} ${docs[i].metadata.loc.lines.from}:${docs[i].metadata.loc.lines.to}`)
    let pageContent = docs[i].pageContent ?? ""

    if (markdown) logMarkdown(pageContent)
    else console.log(pageContent)
  })

}