import Link from "next/link";
import Image from "next/image";
// import { getMeals } from "@/lib/meals";

// Utility function to ensure the image path starts with a leading slash
// function validateImagePath(imagePath) {
//   if (!imagePath.startsWith("/")) {
//     return `/${imagePath}`;
//   }
//   return imagePath;
// }

function MealsItems({ title, slug, image, summary, creator }) {
  // const validImagePath = validateImagePath(image);

  return (
    <>
      <div className="col-12 col-md-10 mb-4 mealsitems ">
        <article className="meal">
          <div className="image">
            <Image
              // src={image.startsWith("/") ? image : `/${image}`} // Ensure leading slash
              src={image} // Ensure leading slash
              alt={title}
              priority
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="content">
            <header>
              <div className="header-text">
                <h2>{title}</h2>
                <p>by {creator}</p>
              </div>
            </header>
            <p className="summary">{summary}</p>
            <div className="actions">
              <Link href={`/Meals/${slug}`}>View Details</Link>{" "}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default MealsItems;
