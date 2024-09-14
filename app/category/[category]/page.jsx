"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page({ params }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-5 md:p-10 w-full bg-base-300 relative">
      <BackButton />
      <h1 className="text-4xl md:text-6xl text-secondary mb-10">
        {params.category} 🍽️
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="card card-compact w-72 md:w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-72 md:w-96 h-auto"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg md:text-xl text-accent flex items-center">
                <PlusIcon />
                {meal.strMeal}
              </h2>
              <Link
                className="card-actions justify-end"
                href={`/meal/${meal.idMeal}`}
              >
                <button className="btn btn-primary text-sm md:text-base">
                  Try 🍴
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Page;
