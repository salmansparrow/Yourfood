import MealsGrid from "@/components/Meals/MealsGrid";
import HeaderPage from "@/components/common/Header";
import Link from "next/link";
import LoadingPage from "./loading";
import Meta from "@/components/common/Meta";

// This function gets data from the server before rendering the page
export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.SERVER_URL}api/meals`);

  if (response.status !== 200) {
    // throw new Error("Error retrieving meals");
  }

  const data = await response.json();
  return {
    props: { meals: data.meals },
  };
};

function MealsPage({ meals }) {
  if (!meals) {
    return <LoadingPage />;
  }

  return (
    <>
      <Meta title={"All Meals"} />

      <HeaderPage />

      <div className="container mt-4">
        <header className="header">
          <h1>
            Delicious meals, created <span className="highlight">by you</span>
          </h1>
          <p>
            Choose your favorite recipe and cook it yourself. It is easy and
            fun!
          </p>
          <p className="cta">
            <Link href="/Meals/Share">Share Your Favorite Recipe</Link>
          </p>
        </header>
        <main className=" mt-4">
          <MealsGrid meals={meals} />
        </main>
      </div>
    </>
  );
}

export default MealsPage;
