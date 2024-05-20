import Link from "next/link";
import Image from "next/image";
// import { getMeals } from "@/lib/meals";

function MealsItems({ title, slug, image, summary, creator }) {
  return (
    <>
      <div className="col-12 col-md-10 mb-4 mealsitems">
        <article className="meal">
          <div className="image">
            <Image
              src={image}
              alt={title}
              priority
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" // Defines different sizes for breakpoints
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
