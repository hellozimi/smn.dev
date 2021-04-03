import Layout, { siteTitle } from '../../components/layout'
import { getAllTIL, getTILPost, getAllTILIds, TILPost } from '../../lib/posts'
import Link from 'next/link'
import DateDisplay from '../../components/date'
import { excerpt } from '.'
import { useEffect, FunctionComponent } from 'react'
import styles from './id.module.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-typescript'
import ReadingTime from '../../components/readingtime'
import TagIcon from '../../components/icons/tagicon'
import Head from 'next/head'

type TILPageParams = {
  post: TILPost
}

const TILPage: FunctionComponent<TILPageParams> = ({ post }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [])
  return (
    <Layout home={false} excerpt={excerpt(post.raw)} mono til title={post.title}>
      <Head>
        <title>TIL: {post.title} - smn.dev</title>
      </Head>
      <div>
        <ReadingTime value={post.raw} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <footer className={styles.footer}>
          {post.date && <DateDisplay value={post.date} />}
          <div>
            {post.tags && (
              <span style={{ color: '#909090' }}>
                <TagIcon fill={'#909090'} /> {post.tags.join(', ')}
              </span>
            )}
          </div>
        </footer>
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

export default TILPage
