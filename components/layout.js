import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import GetProfile from '../lib/profile';

export default function Layout({ children, home }) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    GetProfile(process.env.USER).then((user) => {
      setData(user);
      setLoading(false);
    });
  }, []);

  if (data === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItens: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={data.bio} />
        <meta name="og:" content={data.login} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src={data.avatar_url}
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{data.name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src={data.avatar_url}
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={data.name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{data.name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
