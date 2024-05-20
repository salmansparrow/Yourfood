// pages/api/shareMeal.js

import sqlite3 from "better-sqlite3";

export default function handler(req, res) {
  const { name, email, title, summary, instructions, image } = req.body;

  // Connect to the SQLite database
  const db = new sqlite3.Database("D:/udemy/Next.js/nextlevelfood/meals.db");

  // Insert form data into the meals table
  const query = `INSERT INTO meals (title, summary, instructions, image, creator, creator_email) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [title, summary, instructions, image, name, email];

  db.run(query, values, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to share meal" });
    } else {
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      res.status(200).json({ message: "Meal shared successfully" });
    }
  });

  // Close the database connection
  db.close();
}
