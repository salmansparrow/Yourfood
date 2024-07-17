import { ConnectToDataBase } from "@/lib/mongodb";

export async function getData(page = 1, pageSize = 10) {
  const db = await ConnectToDataBase();
  const collection = db.collection("meals");

  const totalCount = await collection.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  const meals = await collection
    .find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return { meals, totalPages };
}
