"use client";
import Image from "next/image";
import { useRef, useState } from "react";

function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click(); // trigger click input to open image picker
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <>
      <div className="picker">
        <label htmlFor={name}>{label}</label>
        <div className="controls">
          <div className="preview">
            {!pickedImage && <p>No Image Picked Yet.</p>}
            {pickedImage && (
              <Image
                src={pickedImage}
                alt="the image selected by the user"
                fill
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
            required
          />
          <button className="button" type="button" onClick={handlePickClick}>
            Pick an Image
          </button>
        </div>
      </div>
    </>
  );
}
export default ImagePicker;
