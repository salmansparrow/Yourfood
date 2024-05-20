// File: /lib/meals.js
import sql from "better-sqlite3";
const db = sql("meals.db");

// const Database = require("better-sqlite3");
// const db = new Database("meals.db");

export async function getMeals() {
  // Simulating delay for demonstration purposes
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ? ").get(slug);
}
