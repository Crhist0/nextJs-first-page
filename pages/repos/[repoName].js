import Layout from '../../components/layout';
import { getAllPostIds } from '../../lib/posts';
import GetRepos from '../../lib/repos';

export async function getStaticProps({ params }) {
  const postData = [];
  GetRepos(process.env.USER).then((repos) => repos.map((repo) => postData.push(repo.download_url)));
  console.log(postData);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  let repoNames = [];
  GetRepos(process.env.USER).then((repos) => repos.map((repo) => repoNames.push(repo.name)));
  const paths = getAllPostIds(repoNames);
  return {
    paths,
    fallback: false,
  };
}

export default function Post() {
  return <Layout>...</Layout>;
}
