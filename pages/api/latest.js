// import dbConnect from '../../../lib/dbConnect'; // Ensure the correct path to dbConnect

import { getMeal } from "@/lib/meals";
import { ConnectToDataBase } from "@/lib/mongodb";

// import Meal from '../../../models/Meal'; // Ensure the correct path to Meal model

export default async function handler(req, res) {
  await ConnectToDataBase(); // Connect to MongoDB

  try {
    // Fetch the latest meal based on mealId
    const latestMeal = await getMeal.findOne().sort({ mealId: -1 });
    const latestId = latestMeal ? latestMeal.mealId : 0;
    res.status(200).json({ latestId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch latest meal ID" });
  }
}
