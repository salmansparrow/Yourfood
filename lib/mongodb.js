import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://truesalman7:L6s9f2jNFWZ7aGcr@myfood.zi0feqh.mongodb.net/?retryWrites=true&w=majority&appName=myfood";
const client = new MongoClient(uri);
let cachedDb = null;

export async function ConnectToDataBase() {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    await client.connect();
    const db = client.db("myfood");
    cachedDb = db;
    console.log("Successfully connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
