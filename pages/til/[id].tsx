import Layout, { siteTitle } from '../../components/layout'
import { getAllTIL, getTILPost, getAllTILIds } from '../../lib/posts'
import Link from 'next/link'
import DateDisplay from '../../components/date'
import { excerpt } from '.'
import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-typescript'

const TilPage = ({ post }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [])
  return (
    <Layout home={false} excerpt={excerpt(post.raw)} mono til title={post.title}>
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <DateDisplay value={post.date} />
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const paths = getAllTILIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const post = await getTILPost(params.id)
  return {
    props: {
      post,
    },
  }
}

export default TilPage
