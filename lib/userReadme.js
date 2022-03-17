export default async function GetUserReadme(name) {
  const data = await fetch(`https://api.github.com/repos/${name}/${name}/contents/README.md`);
  const item = await data.json();
  return item.content;
}
