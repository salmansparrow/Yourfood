import { getMeals } from "@/lib/meals";

export default async function handler(req, res) {
  const meals = await getMeals();
  res.json({ meals });
  console.log(req.meals);
}
// if (req.method.toUpperCase() === "GET") {
//   const meals = await getMeals();
//   res.status(2000).json({ meals });
// }
