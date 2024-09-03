"use client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Adjust if needed
import { storage } from "@/lib/firebaseConfig"; // Adjust the path based on your file structure
import Image from "next/image";
import { useRef } from "react";

function ImagePicker({ label, name, value, onChange }) {
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click(); // trigger click input to open image picker
  }

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const imageRef = ref(storage, `meals/${file.name || file.name}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);

      // Pass the URL to the parent component
      onChange({ target: { name, value: imageUrl } });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return (
    <div className="picker">
      <label htmlFor={name}>{label}</label>
      <div className="controls">
        <div className="preview">
          {!value && <p>No Image Picked Yet.</p>}
          {value && (
            <Image
              src={value}
              alt="the image selected by the user"
              height={160}
              width={160}
            />
          )}
        </div>
        <input
          className="input"
          type="file"
          accept="image/png, image/jpeg"
          id={name}
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className="button" type="button" onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
