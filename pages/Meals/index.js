import Layout from "@/components/Layouts/Layout";
import MealsGrid from "@/components/Meals/MealsGrid";
import NavbarPage from "@/components/Navbar";
import HeaderPage from "@/components/common/Header";
// import { getMeals } from "@/lib/meals";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "./loading";

// This function gets data from the server before rendering the page
export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3001/api/meals");
  console.log(response);
  if (!response.status == "200") {
    throw new Error("Error retrieving meals");
  }

  const data = await response.json();

  console.log("Meals: ", data.meals);
  // return meals;
  return {
    props: { meals: data.meals }, // Pass data to the page as props
  };
};

function MealsPage(props) {
  // const { meals } = getMeals();
  const { meals } = props;
  console.log(meals);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state

  useEffect(() => {
    // Simulating a data fetch with a timeout
    setTimeout(() => {
      meals; // Data fetched
      setIsLoading(false); // Loading completed
    }, 2000); // Simulating a 2-second delay
  }, []); // Runs once after the component mounts

  if (isLoading) {
    return (
      <Suspense fallback>
        {" "}
        {
          <p className="loading">
            <LoadingPage />
          </p>
        }
      </Suspense>
    ); // Display loading
  }
  return (
    <>
      <HeaderPage />

      <div className="container mt-4">
        {" "}
        {/* Bootstrap container for responsive grid */}
        <header className="header">
          {" "}
          {/* Center-align text */}
          <h1>
            Delicious meals, created <span className="highlight">by you</span>
          </h1>
          <p>
            Choose your favorite recipe and cook it yourself. It is easy and
            fun!
          </p>
          <p className="cta">
            <Link href="/meals/share">Share Your Favorite Recipe</Link>
          </p>
        </header>
        <main className=" mt-4">
          {" "}
          {/* Add top margin for separation */}
          {/* <Suspense fallback={<p className="loading">Fetching meals...</p>}> */}
          <MealsGrid meals={meals} />
          {/* </Suspense> */}
        </main>
      </div>
    </>
  );
}

export default MealsPage;
