import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
    blurb?: string;
    visible?: boolean;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          I’m a software engineer living in{" "}
          <Link href="https://www.google.com/maps/@59.3028168,18.0767966,14z">
            Stockholm
          </Link>
          . Currently working at <Link href="https://popdog.com">Popdog</Link>{" "}
          writing Golang. My life is mostly surrounded by{" "}
          <Link href="https://github.com/hellozimi">code</Link> and mechanical
          keyboards.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Links</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem}>
            <a href="https://instagram.com/hellozimi">Instagram</a>
            <br />
            <small className={utilStyles.lightText}>
              Capturing my life and sharing it online
            </small>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://github.com/hellozimi">Github</a>
            <br />
            <small className={utilStyles.lightText}>I love open source</small>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://popdog.com">Popdog</a>
            <br />
            <small className={utilStyles.lightText}>
              I'm currently working at Popdog as a software engineer. A new way
              to find out what's on in gaming and esports.
            </small>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://instagram.com/smn.dev">instagram.com/smn.dev</a>
            <br />
            <small className={utilStyles.lightText}>
              I'm occasionally posting things about my tech life
            </small>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://twitch.tv/hellozimi">twitch.tv/hellozimi</a>
            <br />
            <small className={utilStyles.lightText}>
              I very occasionally stream on Twitch.
            </small>
          </li>
        </ul>
      </section>
      {allPostsData.length > 0 && (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Thoughts</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title, blurb }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                {blurb && <aside>{blurb}</aside>}
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
