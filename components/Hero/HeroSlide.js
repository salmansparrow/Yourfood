"use client";
import burgerImg from "@/public/images/burger.jpg";
import curryImg from "@/public/images/curry.jpg";
import dumplingsImg from "@/public/images/dumplings.jpg";
import macncheeseImg from "@/public/images/macncheese.jpg";
import pizzaImg from "@/public/images/pizza.jpg";
import schnitzelImg from "@/public/images/schnitzel.jpg";
import tomatoSaladImg from "@/public/images/tomato-salad.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

const image = [
  { image: burgerImg, alt: "A delicious, juicy burger" },
  { image: curryImg, alt: "A delicious, spicy curry" },
  { image: dumplingsImg, alt: "Steamed dumplings" },
  { image: macncheeseImg, alt: "Mac and cheese" },
  { image: pizzaImg, alt: "A delicious pizza" },
  { image: schnitzelImg, alt: "A delicious schnitzel" },
  { image: tomatoSaladImg, alt: "A delicious tomato salad" },
];

function HeroSlide() {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((e) => (e < image.length - 1 ? e + 1 : 0));
    }, 5000); // 5-second interval for changing images

    return () => clearInterval(interval); // Correct cleanup function
  }, []); // Dependency array ensures this effect runs once on mount

  return (
    <>
      {" "}
      <div className="col-12 col-lg-4 slide-show">
        {" "}
        {/* Smaller column on large screens */}
        {image.map((img, index) => (
          <Image
            key={index}
            src={img.image}
            alt={img.alt}
            layout="fill" // Fills the container
            priority={index === currentImage} // Priority for the active image
            className={index === currentImage ? "active" : ""} // Active class
          />
        ))}
      </div>
    </>
  );
}

export default HeroSlide;
