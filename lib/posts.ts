import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import striptags from 'striptags'
import remarkParse from 'remark-parse'
import gfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const tilDirectory = path.join(process.cwd(), 'posts/til')

type Matter = {
  title?: string
  date: string
  tags?: string[]
}

export type TILPost = {
  id: string
  content: string
  raw: string
} & Matter

export const getAllTIL = async () => {
  const fileNames = fs.readdirSync(tilDirectory)
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(tilDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const meta = matter(fileContents)
      const content = (
        await unified()
          .use(remarkParse)
          .use(gfm)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process(meta.content)
      ).toString()
      return {
        id,
        content,
        raw: striptags(content),
        ...meta.data,
      } as TILPost
    }),
  )

  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllTILIds = () => {
  const fileNames = fs.readdirSync(tilDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export const getTILPost = async (id: string) => {
  const fullPath = path.join(tilDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const meta = matter(fileContents)
  const content = (
    await unified()
      .use(remarkParse)
      .use(gfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(meta.content)
  ).toString()
  console.log(content)
  return {
    id,
    content,
    raw: striptags(content),
    ...meta.data,
  } as TILPost
}
