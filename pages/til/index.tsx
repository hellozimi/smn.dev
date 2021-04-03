import Layout, { siteTitle } from '../../components/layout'
import { getAllTIL } from '../../lib/posts'
import Link from 'next/link'
import DateDisplay from '../../components/date'
import styles from './index.module.css'
import Head from 'next/head'

const Til = ({ posts }) => {
  return (
    <Layout mono title={'Today I Learned'}>
      <Head>
        <title>Today I Learned - smn.dev</title>
      </Head>
      {posts.map(post => (
        <div key={post.id} className={styles.item}>
          <Link href={`/til/${post.id}`}>
            <a>{post.title}</a>
          </Link>
          <p>{excerpt(post.raw)}</p>
          <DateDisplay value={post.date} />
        </div>
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const posts = await getAllTIL()
  return {
    props: {
      posts,
    },
  }
}

export const excerpt = (str: string, len: number = 140) => str.substring(0, len).trim() + '…'

export default Til
