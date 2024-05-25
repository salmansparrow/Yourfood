import fs from "fs";
import path from "path";
// File: /lib/meals.js
import sql from "better-sqlite3";
const db = sql("D:/udemy/Next.js/nextlevelfood/meals.db"); // Adjust this path to your database location
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

// export async function saveImage(meal) {
//   console.log(typeof meal.image);
//   // const extension = meal.image.split(".").pop();
//   // const dataInfo = meal.image.split(",")[0];
//   const [dataInfo, imageInfo] = meal.image.split(",");
//   const mediaType = dataInfo.split(";")[0];
//   const extension = mediaType.split("/").pop();

//   // const extension = "jpg";

//   const fileName = `${meal.slug}.${extension}`;
//   // const stream = fs.createWriteStream(`public/images/${fileName}`);
//   // const stream = fs.writeFile(`${fileName}`);

//   // const imageBlob = new Blob([imageInfo], { type: `image/${extension}` });

//   // const bufferImage = await imageBlob.arrayBuffer();
//   // const bufferImage = await meal.image.arrayBuffer();

//   const buffer = Buffer.from(imageInfo, "base64");

//   // const buffer = Buffer.from(bufferImage);

//   console.log(buffer);

//   fs.writeFile(`/public/upload/${fileName}`, buffer, "base64", (err) => {
//     if (err) throw err;
//     console.log("The file has been saved!");
//   });

//   // await stream.write(Buffer.from(bufferImage), (error) => {
//   //   if (error) {
//   //     throw new Error("Saving Image Failed!");
//   //   }
//   // });
//   // meal.image = `/upload/${fileName}`;
//   meal.image = `/upload/${fileName}`;
//   return meal.image;
//   // db.prepare(
//   //   `
//   // INSERT INTO meals (image) VALUES (@image)
//   // `
//   // ).run(meal);
// }

export async function saveImage(meal) {
  try {
    // Ensure the image property exists
    if (!meal.image) {
      throw new Error("Meal image is not provided");
    }

    // Split the data URL into its components
    const [dataInfo, imageData] = meal.image.split(",");
    const mediaType = dataInfo.split(";")[0];
    const extension = mediaType.split("/").pop();

    const fileName = `${meal.slug}.${extension}`;

    // Define the output path
    const outputDir = path.join(process.cwd(), "public", "upload");
    const outputPath = path.join(outputDir, fileName);

    // Ensure the directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Convert the base64 string to a buffer
    const buffer = Buffer.from(imageData, "base64");

    // Write the buffer to a file
    fs.writeFile(outputPath, buffer, (err) => {
      if (err) throw new Error("Saving Image Failed! " + err.message);
      console.log("The file has been saved!");
    });

    // Set the meal image path correctly for Next.js
    meal.image = `/upload/${fileName}`;
    return meal.image;
  } catch (error) {
    throw new Error("Saving Image Failed! " + error.message);
  }
}
