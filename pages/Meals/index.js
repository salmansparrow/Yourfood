import MealsGrid from "@/components/Meals/MealsGrid";

import HeaderPage from "@/components/common/Header";
// import { getMeals } from "@/lib/meals";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingPage from "./loading";

// This function gets data from the server before rendering the page
export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/meals");

  if (response.status !== 200) {
    throw new Error("Error retrieving meals");
  }

  const data = await response.json();
  return {
    props: { meals: data.meals },
  };
};

function MealsPage(props) {
  // // const { meals } = getMeals();
  // const { meals } = props;
  // console.log(meals);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (meals.length > 0) {
  //     setIsLoading(false); // Data is already fetched server-side
  //   }
  // }, [meals]);

  // if (isLoading) {
  //   return (
  //     <div style={{ textAlign: "center", padding: "2rem" }}>
  //       <p>Fetching Meals...</p> {/* Simple loading message */}
  //     </div>
  //   );
  // }
  const [meals, setMeals] = useState([]); // State for meals
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("/api/meals"); // Client-side fetch
        if (response.ok) {
          const data = await response.json();
          setMeals(data.meals); // Set fetched data
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    fetchMeals(); // Trigger the fetch
  }, []); // Run effect once on component mount

  if (isLoading) {
    return <LoadingPage />; // Show loading component while data is fetching
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
            <Link href="/Meals/Share">Share Your Favorite Recipe</Link>
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
