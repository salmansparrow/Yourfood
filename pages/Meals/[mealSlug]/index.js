import Layout from "@/components/Layouts/Layout";
import { getMeal } from "@/lib/meals";
import Image from "next/image";
import Error from "./error";
import Meta from "@/components/common/Meta";
// import { notFound } from "next/navigation";

export const getServerSideProps = async (context) => {
  const { mealSlug } = context.params;

  // if (!meal) {
  //   return {
  //     props: {
  //       error: "Meal not found",
  //     },
  //   };
  // }

  try {
    const meal = await getMeal(mealSlug);

    if (!meal) {
      return {
        notFound: true,
      };
    }
    meal.instructions = meal.instructions.replace(/\n/g, "<br/>");
    return {
      props: { meal },
    };
  } catch (error) {
    console.error("Error fetching meal:", error);
    return {
      props: {
        error: "Failed to fetch meal",
      },
    };
  }
};

function MealDetailsPage({ meal, error }) {
  // const htmlContent =
  //   "<p>Here is some raw HTML content with <strong>dangerous</strong> code.</p>";
  // const meal = getMeal(params.mealSlug);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <Meta
        title={meal.title}
        keywords={`recipe, ${meal.title}, ${meal.creator}`} // Customize keywords as needed
        description={meal.summary} // Use meal summary for description
      />

      <Layout>
        <section className="mdheader">
          <div className="mdimage">
            <Image src={meal.image} fill alt={meal.title} />
          </div>

          <div className="mdheaderText">
            <h1>{meal.title}</h1>
            <p className="mdcreator">
              by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
            </p>
            <p className="mdsummary"> {meal.summary}</p>
          </div>
        </section>

        <section>
          <p
            className="mdinstructions"
            dangerouslySetInnerHTML={{ __html: meal.instructions }} // Correctly setting raw HTML content
          ></p>
        </section>
      </Layout>
    </>
  );
}
export default MealDetailsPage;
