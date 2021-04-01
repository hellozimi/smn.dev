import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import striptags from 'striptags'
import remark from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const tilDirectory = path.join(process.cwd(), 'posts/til')

type Matter = {
  title?: string
  date?: string
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
    fileNames.map(async fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(tilDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const meta = matter(fileContents)
      const content = (await remark().use(gfm).use(html).process(meta.content)).toString()
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
  return fileNames.map(fileName => {
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
  const content = (await remark().use(gfm).use(html).process(meta.content)).toString()
  return {
    id,
    content,
    raw: striptags(content),
    ...meta.data,
  } as TILPost
}
