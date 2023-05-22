// @ts-ignore
import markdown from 'markdown-it'
// @ts-ignore
import terminal from 'markdown-it-terminal'


export const logMarkdown = (text: string) => {
  try {
    const md = markdown()
    md.use(terminal)
    console.log(md.render(text))
  } catch (e) {
    console.log(text)
  }
}
