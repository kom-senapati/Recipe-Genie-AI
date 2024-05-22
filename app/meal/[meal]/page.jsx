"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const [mealData, setMealData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.meal}`)
      .then((res) => res.json())
      .then((data) => {
        setMealData(data.meals[0]);
        console.log(mealData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen py-10 bg-base-300 flex justify-center items-center">
      {mealData ? (
        <div className="max-w-96 md:max-w-7xl w-full bg-base-200 text-base-content shadow-md rounded-lg overflow-hidden">
          <button
            className="btn btn-circle bg-base-content hover:bg-neutral-content absolute top-5 md:top-10 left-3 md:left-10"
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
            >
              <path d="M20 11H7.41l2.29-2.29A1 1 0 1 0 8.29 7.29L3.71 12l4.59 4.59a1 1 0 0 0 1.42-1.42L7.41 13H20a1 1 0 0 0 0-2z" />
            </svg>
          </button>
          <div className="px-10 md:px-20 py-10">
            <h1 className="text-3xl text-center font-bold text-primary mb-4">
              {mealData.strMeal}
            </h1>
            <div className="flex flex-col md:flex-row gap-10">
              <div>
                <img
                  src={mealData.strMealThumb}
                  alt={mealData.strMeal}
                  className="max-w-72 md:max-w-xl h-auto rounded-lg mb-4"
                />
                <div className="flex items-center space-x-4 mb-4">
                  <span className="badge badge-primary">
                    {mealData.strArea}
                  </span>
                  <span className="badge badge-success">
                    {mealData.strCategory}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-xl text-neutral-content font-semibold mb-2">
                  Ingredients
                </h2>
                <table className="w-full mb-4">
                  <tbody>
                    {Object.keys(mealData)
                      .filter(
                        (key) => key.includes("strIngredient") && mealData[key]
                      )
                      .map((key, index) => (
                        <tr key={index}>
                          <td className="py-1 pr-4">{mealData[key]}</td>
                          <td className="py-1">
                            {mealData[`strMeasure${key.slice(13)}`]}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-xl text-neutral-content font-semibold mb-2">
                Instructions
              </h2>
              <p className="text-base-content">{mealData.strInstructions}</p>
            </div>
            {mealData.strYoutube && (
              <btn
                href={mealData.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Watch on YouTube
              </btn>
            )}
          </div>
        </div>
      ) : (
        <div className="text-gray-800 text-lg">Loading...</div>
      )}
    </div>
  );
}

export default Page;
