// import { getMeals } from "@/lib/meals";

// export default async function handler(req, res) {
//   const meals = await getMeals();
//   res.json({ meals });
//   console.log(req.meals);
// }

// // if (req.method.toUpperCase() === "GET") {
// //   const meals = await getMeals();
// //   res.status(2000).json({ meals });
// // }

import { ConnectToDataBase } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { page = 1, pageSize = 10 } = req.query;

    try {
      const db = await ConnectToDataBase();
      const collection = db.collection("meals");

      const totalCount = await collection.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);

      const meals = await collection
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray();

      res.status(200).json({ meals, totalPages });
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      res.status(500).json({ error: "Failed to fetch meals" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
