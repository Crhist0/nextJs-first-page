import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import GetRepos from '../lib/repos';
import GetProfile from '../lib/profile';
import GetReadmeRepo from '../lib/readmeRepo';
import { useState, useEffect } from 'react';

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
      setRepos(repos.filter((repo) => repo));
      if (repos.filter((repo) => repo.name === process.env.USER).length > 0) {
        GetReadmeRepo(process.env.USER).then((content) => {
          setReadmeRepo(content);
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

  console.log(repos);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p style={{ textAlign: 'center' }}>{data.bio}</p>
      </section>
      {/* <div dangerouslySetInnerHTML={createHTML(atob(readmeRepo))} /> */}
      <h2 className={utilStyles.headingLg}>Repositórios</h2>
      <section id="content" className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {repos.map(({ id, pushed_at, name }) => (
            <li className={utilStyles.listItem} key={id}>
              {name}
              <br />
              {id}
              <br />
              {pushed_at}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
