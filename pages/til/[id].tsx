import Layout, { siteTitle } from '../../components/layout'
import { getAllTIL, getTILPost, getAllTILIds, TILPost } from '../../lib/posts'
import Link from 'next/link'
import DateDisplay from '../../components/date'
import { excerpt } from '.'
import { useEffect, FunctionComponent } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-typescript'

type TILPageParams = {
  post: TILPost
}

const ReadingTime = ({ value }: { value: string }) => {
  const rt = readingTime(value)
  console.log(rt)
  if (rt < 0) {
    return null
  }
  return (
    <span style={{ color: '#909090' }}>
      <ClockIcon fill={'#909090'} /> {Math.round(rt)} minutes
    </span>
  )
}

const ClockIcon = ({ fill }) => (
  <svg width="16" height="16" viewBox="0 0 313 313" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M156.5 279C224.155 279 279 224.155 279 156.5C279 88.8451 224.155 34 156.5 34C88.8451 34 34 88.8451 34 156.5C34 224.155 88.8451 279 156.5 279ZM156.5 313C242.933 313 313 242.933 313 156.5C313 70.0674 242.933 0 156.5 0C70.0674 0 0 70.0674 0 156.5C0 242.933 70.0674 313 156.5 313Z"
      fill={fill}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M157 50C169.15 50 179 59.8497 179 72V154.608L223.411 204.348C231.503 213.411 230.716 227.318 221.652 235.411C212.589 243.503 198.682 242.716 190.589 233.652L140.589 177.652C136.99 173.621 135 168.405 135 163V72C135 59.8497 144.85 50 157 50Z"
      fill={fill}
    />
  </svg>
)

const TagIcon = ({ fill }) => (
  <svg width="22" height="12" viewBox="0 0 360 209" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M30 0C13.4315 0 0 13.4315 0 30V179C0 195.569 13.4315 209 30 209H241.977C249.093 209 255.977 206.47 261.401 201.863L349.09 127.363C363.191 115.382 363.191 93.6176 349.09 81.6373L261.401 7.13724C255.978 2.52968 249.093 0 241.977 0H30ZM60 44C51.7157 44 45 50.7157 45 59V149C45 157.284 51.7157 164 60 164H98C106.284 164 113 157.284 113 149V59C113 50.7157 106.284 44 98 44H60Z"
      fill={fill}
    />
  </svg>
)

const TILPage: FunctionComponent<TILPageParams> = ({ post }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [])
  return (
    <Layout home={false} excerpt={excerpt(post.raw)} mono til title={post.title}>
      <div>
        <ReadingTime value={post.raw} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.date && <DateDisplay value={post.date} />}
        <div>
          {post.tags && (
            <span style={{ color: '#909090' }}>
              <TagIcon fill={'#909090'} /> {post.tags.join(', ')}
            </span>
          )}
        </div>
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

const readingTime = (str: string) => {
  const wpm = 200
  const words = str
    .trim()
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, ' ')
    .match(/\S+/g).length

  return words / wpm
}

export default TILPage
