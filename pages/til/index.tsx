import Layout, { siteTitle } from '../../components/layout'
import { getAllTIL } from '../../lib/posts'
import Link from 'next/link'
import DateDisplay from '../../components/date'
import styles from './index.module.css'

const Til = ({ posts }) => {
  return (
    <Layout mono title={'Today I Learned'}>
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
