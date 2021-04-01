import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = `Simon`
export const siteTitle = `Hi, I'm Simon!`

type LayoutProps = {
  home?: boolean
  til?: boolean
  title?: string
  mono?: boolean
  excerpt?: string
}

const Layout: FunctionComponent<LayoutProps> = ({ children, home, til, title, mono, excerpt }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
          rel="stylesheet"
        ></link>
        <meta name="description" content={excerpt || `I'm Simon and I write code.`} />
        <meta name="og:title" content={title ? `${title} - smn.dev` : siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <h2 className={utilStyles.headingLg}>
          <a className={utilStyles.colorInherit}>{title || siteTitle}</a>
        </h2>
      </header>
      <main className={mono && 'mono'}>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href={til ? '/til' : '/'}>
            <a>← Back to {til ? 'TIL' : 'home'}</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout
