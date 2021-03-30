import Layout, { siteTitle } from '../../components/layout'
import { getAllTIL } from '../../lib/posts'
import Link from 'next/link'
import DateDisplay from '../../components/date'

const Til = ({ posts }) => {
  return (
    <Layout mono title={'Today I Learned'}>
      {posts.map(post => (
        <div key={post.id}>
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

export const excerpt = (str: string, len: number = 140) => str.substring(0, len) + '…'

export default Til
