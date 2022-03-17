export default async function GetProfile(name) {
  const data = await fetch(`https://api.github.com/users/${name}`);
  const item = await data.json();
  return item;
}
