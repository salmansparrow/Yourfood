import sqlite3 from "better-sqlite3";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired size limit here
    },
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, title, summary, instructions, image } = req.body;

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

    try {
      const stmt = db.prepare(query);
      const result = stmt.run(values);

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

// pages/api/shareMeal.js

// import sqlite3 from "better-sqlite3";
// import fs from "fs";
// import path from "path";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { name, email, title, summary, instructions, image } = req.body;

//     // Log incoming request data
//     console.log("Received request body:", req.body);

//     // Decode the base64 image
//     const base64Image = image.split(";base64,").pop();
//     const uploadsDir = path.join(process.cwd(), "uploads");

//     // Ensure uploads directory exists
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir);
//     }

//     // Generate a unique filename
//     const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
//     const filePath = path.join(uploadsDir, filename);

//     // Save the image to the uploads directory
//     fs.writeFileSync(filePath, base64Image, { encoding: "base64" });

//     // Connect to the SQLite database using the absolute path
//     const dbPath = "D:/udemy/Next.js/nextlevelfood/meals.db";
//     console.log(`Connecting to database at: ${dbPath}`);
//     const db = new sqlite3(dbPath);

//     // Insert form data into the meals table
//     const query = `INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//     const imagePath = `/uploads/${filename}`;
//     const values = [title, summary, instructions, imagePath, name, email];

//     let slug = title.toLowerCase().split(" ").join("-");
//     values.push(slug);

//     try {
//       const stmt = db.prepare(query);
//       const result = stmt.run(values);

//       console.log(`A row has been inserted with values: ${values}`);
//       console.log(`Last inserted row ID: ${result.lastInsertRowid}`);

//       res.status(200).json({
//         message: "Meal shared successfully",
//         id: result.lastInsertRowid,
//       });
//     } catch (err) {
//       console.error("Database insertion error:", err.message);
//       res.status(500).json({ error: "Failed to share meal" });
//     } finally {
//       // Close the database connection
//       db.close();
//       console.log("Database connection closed.");
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
