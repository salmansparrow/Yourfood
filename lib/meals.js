// // File: /lib/meals.js
// import sql from "better-sqlite3";
// const db = sql("D:/udemy/Next.js/nextlevelfood/meals.db"); // Adjust this path to your database location
// // const Database = require("better-sqlite3");
// // const db = new Database("meals.db");

// export async function getMeals() {
//   // Simulating delay for demonstration purposes

//   return db.prepare("SELECT * FROM meals").all();
// }

// export function getMeal(slug) {
//   return db.prepare("SELECT * FROM meals WHERE slug = ? ").get(slug);
// }

import { ConnectToDataBase } from "./mongodb";

export async function getMeals() {
  try {
    const db = ConnectToDataBase();
    const collection = db.collection("meals");
    const meals = await collection.find().toArray();
    return meals.map((meal) => ({ ...meal, _id: meal._id.toString() }));
  } catch (error) {
    console.error("failed to fetch meals: ", error);
    throw new error("failed to fetch meals");
  }
}

export async function getMeal(slug) {
  try {
    const db = await ConnectToDataBase();
    const collection = db.collection("meals");
    const meal = await collection.findOne({ slug: slug });
    if (meal) {
      meal._id = meal._id.toString();
    }
    return meal;
  } catch (error) {
    console.error("Failed to fetch meal:", error);
    throw new Error("Failed to fetch meal");
  }
}

export async function saveImage(imageUrl) {
  try {
    if (!imageUrl) {
      throw new Error("Image URL is not provided");
    }

    // Return the image URL directly
    return imageUrl;
  } catch (error) {
    throw new Error("Saving Image Failed! " + error.message);
  }
}

// export async function saveImage(meal) {
//   try {
//     if (!meal.image) {
//       throw new Error("Meal image is not provided");
//     }

//     // Return the base64 data directly
//     return meal.image;
//   } catch (error) {
//     throw new Error("Saving Image Failed! " + error.message);
//   }
// }
