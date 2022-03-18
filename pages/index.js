import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import GetRepos from '../lib/repos';
import GetProfile from '../lib/profile';
import GetUserReadme from '../lib/userReadme';
import { useState, useEffect } from 'react';
import BasicCard from '../components/card';

import { Base64 } from 'js-base64';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';

export function sortByProp(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    }
    if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  };
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

function createHTML(html) {
  return { __html: html };
}

export default function Home({ allPostsData }) {
  const [data, setData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [readmeRepo, setReadmeRepo] = useState([]);

  useEffect(() => {
    // setLoading(true);
    GetProfile(process.env.USER).then((user) => {
      setData(user);
      // setLoading(false);
    });
    GetRepos(process.env.USER).then((repos) => {
      setRepos(repos);
      if (repos.filter((repo) => repo.name === process.env.USER).length > 0) {
        GetUserReadme(process.env.USER).then(async (content) => {
          const processedContent = await unified()
            .use(remarkParse)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw) // *Parse* the raw HTML strings embedded in the tree
            .use(rehypeSanitize)
            .use(rehypeStringify)
            .process(Base64.decode(content));
          setReadmeRepo(processedContent);
        });
      }
    });
  }, []);

  if (data === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItens: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItens: 'center' }}>
          {' '}
          <h1>User sem Readme</h1>
        </div>
      </>
    );
  }

  console.log('repos:', repos);
  console.log('readmeRepo:', readmeRepo);
  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content)
  // const contentHtml = processedContent.toString()
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p style={{ textAlign: 'center' }}>{data.bio}</p>
      </section>
      <div dangerouslySetInnerHTML={createHTML(readmeRepo)} />
      <h2 className={utilStyles.headingLg}>Repositórios</h2>
      <section id="content" className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {repos
            .sort(sortByProp('stargazers_count'))
            .map(({ id, pushed_at, name, description, html_url }) => (
              <li className={utilStyles.listItem} key={id}>
                <BasicCard
                  name={name}
                  pushed_at={pushed_at}
                  description={description}
                  url={html_url}
                />
              </li>
            ))}
        </ul>
      </section>
    </Layout>
  );
}
