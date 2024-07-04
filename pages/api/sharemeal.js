// // import sqlite3 from "better-sqlite3";
// import { ConnectToDataBase } from "@/lib/mongodb";
// import { saveImage } from "@/lib/meals";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired size limit here
    },
  },
};

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     let { name, email, title, summary, instructions, image } = req.body;

//     // Log incoming request data
//     console.log("Received request body:", req.body);

//     try {
//       const db = await ConnectToDataBase();
//       const collection = db.collection("meals");

//       let slug = title.toLowerCase().split(" ").join("-");
//       const existingSlugCount = await collection.countDocuments({
//         title: title.toLowerCase(),
//       });

//       if (existingSlugCount > 0) {
//         slug = `&{slug}-${existingSlugCount}`;
//       }
//       const imagePath = await saveImage({ image, slug });

//       const mealData = {
//         title,
//         summary,
//         instructions,
//         image: imagePath,
//         creator: name,
//         creator_email: email,
//         slug,
//       };

//       const result = await collection.insertOne(mealData);

//       console.log(`A meal has been inserted with ID: ${result.insertedId}`);
//       res.status(200).json({ success: true, meal: mealData });
//     } catch (error) {
//       console.error("Error Sharing meal : ", error);
//       res.status(500).json({ error: "failed to share meal" });
//     }
//   } else {
//     res.status(405).json({ error: "Failed to Share Meal" });
//   }
// }

// //     // Connect to the SQLite database using the absolute path
// //     const dbPath = "D:/udemy/Next.js/nextlevelfood/meals.db";
// //     console.log(`Connecting to database at: ${dbPath}`);
// //     const db = new sqlite3(dbPath);

// //     // Insert form data into the meals table
// //     const query = `INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (?, ?, ?, ?, ?, ?, ?)`;
// //     const values = [title, summary, instructions, image, name, email];

// //     let slug = title.toLowerCase().split(" ");
// //     slug = slug.length > 1 ? slug.join("-") : slug[0];

// //     const existingSlug = db
// //       .prepare(`SELECT COUNT(*) as count FROM meals WHERE title = ?`)
// //       .get(title.toLowerCase());

// //     if (existingSlug.count > 0) {
// //       slug = `${slug}-${existingSlug.count}`;
// //     }

// //     values.push(slug);

// //     console.log(slug);
// //     values[3] = await saveImage({ image, slug });

// //     try {
// //       const stmt = db.prepare(query);
// //       const result = stmt.run(values);
// //       // saveMeal(values);

// //       console.log(`A row has been inserted with values: ${values}`);
// //       console.log(`Last inserted row ID: ${result.lastInsertRowid}`);

// //       await delay(2000);
// //       await fetch(
// //         `http://localhost:3000/api/revalidate?path=/Meals&secret=${process.env.MY_SECRET_TOKEN}`
// //       );
// //       // res.status(200).json({ success: true });
// //       res.status(200).json({ success: true, image: values[3] }); // Return image path
// //     } catch (err) {
// //       console.error("Database insertion error:", err.message);
// //       res.status(500).json({ error: "Failed to share meal" });
// //     } finally {
// //       // Close the database connection
// //       db.close();
// //       console.log("Database connection closed.");
// //     }
// //   } else {
// //     res.status(405).json({ error: "Method not allowed" });
// //   }
// // }

// File: pages/api/sharemeal.js
import { ConnectToDataBase } from "@/lib/mongodb";
import { saveImage } from "@/lib/meals";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { name, email, title, summary, instructions, image } = req.body;

    try {
      // Log incoming request data
      console.log("Received request body:", req.body);

      // Connect to MongoDB
      const db = await ConnectToDataBase();
      const collection = db.collection("meals");

      // Prepare the meal data
      let slug = title.toLowerCase().split(" ");
      slug = slug.length > 1 ? slug.join("-") : slug[0];

      const existingSlug = await collection.countDocuments({
        title: title.toLowerCase(),
      });

      if (existingSlug > 0) {
        slug = `${slug}-${existingSlug}`;
      }

      const imageData = await saveImage({ image, slug });

      const meal = {
        title,
        summary,
        instructions,
        image: imageData, // Save the image as base64 data
        creator: name,
        creator_email: email,
        slug,
      };

      // Insert meal data into MongoDB
      const result = await collection.insertOne(meal);

      console.log(`A meal has been inserted with ID: ${result.insertedId}`);

      res.status(200).json({ success: true, meal });
    } catch (err) {
      console.error("Database insertion error:", err.message);
      res.status(500).json({ error: "Failed to share meal" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
