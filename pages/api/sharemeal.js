// File: pages/api/sharemeal.js
import { ConnectToDataBase } from "@/lib/mongodb";
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

    try {
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

      // Save the image URL
      const imageUrl = await saveImage(image);

      const meal = {
        title,
        summary,
        instructions,
        image: imageUrl, // Save the image URL
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
