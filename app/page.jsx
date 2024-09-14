"use client";

import { PlusIcon, PlusIcon2 } from "@/components/Icons";
import RecipeSearchBar from "@/components/RecipeSearchBar";
import StartTour from "@/components/StartTour";
import { CATEGORIES_URL } from "@/lib/urls";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShepherdJourneyProvider } from "react-shepherd";

function page() {
  const [categories, setCategories] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ShepherdJourneyProvider>
      <div className="navbar bg-base-300 flex flex-col md:flex-row">
        <div className="flex-1">
          <Link
            href="#"
            id="main"
            className="btn btn-ghost text-xl text-accent"
          >
            🍱 Recipe Genie
          </Link>
        </div>
        <RecipeSearchBar
          handleBlur={handleBlur}
          handleSearchFocus={handleSearchFocus}
          showResults={showResults}
          setShowResults={setShowResults}
        />
      </div>

      <div
        className={`flex flex-col items-center justify-center p-5 md:p-10 w-full bg-base-200 ${
          !showResults ? "opacity-100" : "opacity-80 blur-sm"
        }`}
      >
        <div class="flex flex-col items-center justify-center p-5 md:p-10 w-full bg-base-900 text-white">
          <div class="text-lg md:text-2xl mb-6 text-primary flex items-center justify-center space-x-2">
            <PlusIcon2 />
            <span>
              Click on the button below to start the tour and explore the
              website.
            </span>
          </div>

          <StartTour />

          <div class="text-xl md:text-2xl text-secondary mb-6 mt-10 md:mt-16 flex items-center justify-center space-x-2">
            <span>🍴 Start Your Food Adventure</span>
          </div>

          <Link href="/random">
            <button id="randomMeal" class="btn btn-accent text-lg md:text-xl">
              🎲 Enjoy a Surprise Meal
            </button>
          </Link>

          <Link href="/ai">
            <button
              id="randomMeal"
              class="mt-5 btn btn-secondary text-lg md:text-xl"
            >
              🤖 Generate meal by AI
            </button>
          </Link>
        </div>

        <div className="divider"></div>

        <h1 className="categories text-xl md:text-2xl text-secondary mb-10 flex items-center">
          🍽️ Explore Diverse Categories for Your Perfect Meal
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((category) => (
            <div className="card card-compact w-72 md:w-96 bg-base-100 shadow-xl pt-2">
              <figure>
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="w-72 md:w-96 h-auto"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg md:text-xl text-accent flex items-center">
                  <PlusIcon />
                  {category.strCategory}
                </h2>
                <p className="text-sm md:text-base">
                  {category.strCategoryDescription.slice(0, 150) + " ..."}
                </p>
                <Link
                  className="card-actions justify-end"
                  href={`/category/${category.strCategory}`}
                >
                  <button className="btn btn-primary text-sm md:text-base">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ShepherdJourneyProvider>
  );
}
export default page;
