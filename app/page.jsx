"use client";

import { PlusIcon } from "@/components/Icons";
import RecipeSearchBar from "@/components/RecipeSearchBar";
import { CATEGORIES_URL } from "@/lib/urls";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

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
    <>
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
        <section className="w-full bg-base-200 p-5 md:p-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              Welcome to Recipe Genie
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-2xl">
              Discover new recipes, let AI generate a meal for you, or take a
              surprise dive into the culinary world. Your next food adventure is
              just a click away!
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/ai">
              <button className="btn btn-secondary text-lg md:text-xl">
                🤖 Generate Recipe by AI
              </button>
            </Link>
            <Link href="/random">
              <button className="btn btn-primary text-lg md:text-xl">
                🎲 Enjoy a Surprise Meal
              </button>
            </Link>
          </div>
        </section>

        <div className="divider"></div>

        <section className="p-5 md:p-10 w-full bg-base-200">
          <h1 className="categories text-xl md:text-2xl text-secondary mb-10 flex items-center justify-center">
            🍽️ Explore Diverse Categories for Your Perfect Meal
          </h1>

          <div className="flex justify-center mb-6">
            <button
              className="btn btn-accent text-lg md:text-xl"
              onClick={() => setShowCategories((prev) => !prev)}
            >
              {showCategories ? "Hide Categories" : "Show Categories"}
            </button>
          </div>

          {showCategories && (
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
          )}
        </section>

        <footer className="footer rounded-md mt-10 p-10 bg-base-300 text-base-content footer-center">
          <div>
            <p>
              Made with ❤️ by{" "}
              <Link
                href="https://github.com/kom-senapati"
                className="text-primary"
              >
                kom-senapati
              </Link>
            </p>
            <p>
              Open Source & Available on{" "}
              <Link
                href="https://github.com/kom-senapati/Recipe-Genie-AI"
                className="text-primary"
              >
                GitHub
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
