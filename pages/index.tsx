import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const Main = () => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          I’m a software engineer living in{' '}
          <Link href="https://www.google.com/maps/@59.3028168,18.0767966,14z">
            <a>Stockholm</a>
          </Link>
          . Building products and helping companies with mobile, web front/backend development.
          Previously at{' '}
          <Link href="https://popdog.com">
            <a>Popdog</a>
          </Link>{' '}
          writing Golang. My life is mostly surrounded by{' '}
          <Link href="https://github.com/hellozimi">
            <a>code</a>
          </Link>{' '}
          and mechanical keyboards.
        </p>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem}>
            <Link href="/til">Today I Learned</Link>
            <br />
            <small className={utilStyles.lightText}>My latest learnings in microblog format.</small>
          </li>
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Links</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem}>
            <a href="https://instagram.com/hellozimi">Instagram</a>
            <br />
            <small className={utilStyles.lightText}>Capturing my life and sharing it online</small>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://github.com/hellozimi">Github</a>
            <br />
            <small className={utilStyles.lightText}>I love open source</small>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://instagram.com/smn.dev">instagram.com/smn.dev</a>
            <br />
            <small className={utilStyles.lightText}>
              {`I'm occasionally posting things about my tech life`}
            </small>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://twitch.tv/hellozimi">twitch.tv/hellozimi</a>
            <br />
            <small className={utilStyles.lightText}>I very occasionally stream on Twitch.</small>
          </li>
        </ul>
      </section>
    </Layout>
  )
}

export default Main
