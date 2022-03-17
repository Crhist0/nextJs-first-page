export default async function GetRepos(name) {
  const data = await fetch(`https://api.github.com/users/${name}/repos`);
  const item = await data.json();
  return item;
}
