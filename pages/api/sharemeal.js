import sqlite3 from "better-sqlite3";
import { saveImage } from "@/lib/meals";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired size limit here
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { name, email, title, summary, instructions, image } = req.body;

    // Log incoming request data
    console.log("Received request body:", req.body);

    // Connect to the SQLite database using the absolute path
    const dbPath = "D:/udemy/Next.js/nextlevelfood/meals.db";
    console.log(`Connecting to database at: ${dbPath}`);
    const db = new sqlite3(dbPath);

    // Insert form data into the meals table
    const query = `INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [title, summary, instructions, image, name, email];

    let slug = title.toLowerCase().split(" ");
    slug = slug.length > 1 ? slug.join("-") : slug[0];

    const existingSlug = db
      .prepare(`SELECT COUNT(*) as count FROM meals WHERE title = ?`)
      .get(title.toLowerCase());

    if (existingSlug.count > 0) {
      slug = `${slug}-${existingSlug.count}`;
    }

    values.push(slug);

    console.log(slug);
    values[3] = await saveImage({ image, slug });

    try {
      const stmt = db.prepare(query);
      const result = stmt.run(values);
      // saveMeal(values);

      console.log(`A row has been inserted with values: ${values}`);
      console.log(`Last inserted row ID: ${result.lastInsertRowid}`);

      res.status(200).json({
        message: "Meal shared successfully",
        id: result.lastInsertRowid,
      });
    } catch (err) {
      console.error("Database insertion error:", err.message);
      res.status(500).json({ error: "Failed to share meal" });
    } finally {
      // Close the database connection
      db.close();
      console.log("Database connection closed.");
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
