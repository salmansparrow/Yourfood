import MealsItems from "./MealsItems";
import { useEffect, useState } from "react";

function MealsGrid({ meals }) {
  // const [isLoading, setIsLoading] = useState(true); // Initial loading state

  // useEffect(() => {
  //   // Simulating a data fetch with a timeout
  //   setTimeout(() => {
  //     meals; // Data fetched
  //     setIsLoading(false); // Loading completed
  //   }, 2000); // Simulating a 2-second delay
  // }, []); // Runs once after the component mounts

  // if (isLoading) {
  //   return <p className="loading">loading data</p>; // Display loading
  // }
  return (
    <>
      <div className="row ">
        <ul className="mealsgrid">
          {meals.map((meal) => (
            <li key={meal._id}>
              <MealsItems {...meal} />
            </li>
          ))}
        </ul>
        {/* <div>
          {meals.map((meal) => {
            return (
              <div className="">
                <MealsItems {...meal} />
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
}

export default MealsGrid;
