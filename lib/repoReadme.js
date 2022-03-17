export default async function GetRepoReadme(name, repo) {
  const data = await fetch(`https://api.github.com/repos/${name}/${repo}/contents/README.md`);
  const item = await data.json();
  return item.content;
}
