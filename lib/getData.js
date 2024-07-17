import { ConnectToDataBase } from "@/lib/mongodb";

export async function getData() {
  const resp = await fetch("api/meals");

  const jsonData = await resp.json();
  return jsonData;
}
