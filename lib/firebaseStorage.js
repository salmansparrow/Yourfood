import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig"; // Adjust path to your Firebase config
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";

export const uploadImageToFirebase = async (file, path) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, path);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

const handleImageUpload = async (file, mealId) => {
  if (!file) return null;

  // Generate a slug using mealId or sequential number
  const generateSlug = (mealId) => {
    return `meal-${mealId}`;
  };

  const slug = generateSlug(mealId); // Use mealId for simplicity
  const fileExtension = file.name.split(".").pop(); // Get the file extension
  const newFileName = `${slug}.${fileExtension}`; // Create a new filename with the slug

  try {
    // Upload the file to Firebase with the new name
    const imageUrl = await uploadImageToFirebase(file, `images/${newFileName}`);
    return imageUrl;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }
};
