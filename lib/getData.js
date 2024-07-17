export async function getData(endpoint) {
  const resp = await fetch(`${process.env.SERVER_URL}${endpoint}`);

  const jsonData = await resp.json();
  console.log(jsonData, "get data ");

  return jsonData;
}
