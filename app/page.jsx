"use client";

import { act, useEffect, useState } from "react";
import Link from "next/link";
import Search from "@/components/search";
import { ShepherdJourneyProvider, useShepherd } from "react-shepherd";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

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
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function StartTour() {
    const shepherd = useShepherd();
    const tour = new shepherd.Tour({
      ...tourOptions,
      useModalOverlay: true,
      defaultStepOptions: {
        scrollTo: true,
        classes: "shadow-lg p-5 bg-base-100",
      },
    });
    const Steps = [
      {
        id: "intro",
        attachTo: { element: "#main", on: "bottom" },
        buttons: [
          {
            classes: "btn btn-error",
            text: "Exit",
            action() {
              return this.cancel();
            },
          },
          {
            classes: "btn btn-success",
            text: "Next",
            action() {
              return this.next();
            },
          },
        ],
        title: "Welcome to Recipe Genie",
        text: [
          "Recipe Genie is a fantastic website to find recipes for your favorite meals.",
        ],
      },
      {
        id: "search",
        attachTo: { element: "#searchBar", on: "bottom" },
        buttons: [
          {
            classes: "btn btn-error",
            text: "Exit",
            action() {
              return this.cancel();
            },
          },
          {
            classes: "btn btn-success",
            text: "Next",
            action() {
              return this.next();
            },
          },
        ],
        title: "Search",
        text: ["Search for your favorite meal and find the recipe."],
      },
      {
        id: "random",
        attachTo: { element: "#randomMeal", on: "bottom" },
        buttons: [
          {
            classes: "btn btn-error",
            text: "Exit",
            action() {
              return this.cancel();
            },
          },
          {
            classes: "btn btn-success",
            text: "Next",
            action() {
              return this.next();
            },
          },
        ],
        title: "Random Meal",
        text: ["Get a random meal recipe."],
      },
      {
        id: "categories",
        attachTo: { element: ".categories", on: "bottom" },
        buttons: [
          {
            classes: "btn btn-error",
            text: "Exit",
            action() {
              return this.cancel();
            },
          },
          {
            classes: "btn btn-success",
            text: "Next",
            action() {
              return this.next();
            },
          },
        ],
        title: "Categories",
        text: ["Explore diverse categories for your perfect meal."],
      },
    ];
    tour.addSteps(Steps);

    return (
      <button className="btn btn-sm btn-secondary" onClick={tour.start}>
        Start Tour {"->"}
      </button>
    );
  }

  return (
    <ShepherdJourneyProvider>
      <div className="navbar bg-base-300 flex flex-col md:flex-row">
        <div id="main" className="flex-1">
          <a className="btn btn-ghost text-xl">🍱 Recipe Genie</a>
        </div>
        <Search
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
        <h1 className="text-lg md:text-xl mb-2">
          Click on the below button to start the tour and explore the website.
        </h1>
        <StartTour />

        <h1 className="text-xl md:text-3xl text-primary mb-2 mt-5">
          Start Your Food Adventure
        </h1>
        <Link href="/random">
          <button id="randomMeal" className="btn btn-primary">
            Enjoy a Surprise Meal
          </button>
        </Link>
        <div className="divider">OR</div>
        <h1 className="categories text-xl md:text-2xl text-primary mb-10">
          Explore Diverse Categories for Your Perfect Meal
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
                <h2 className="card-title">{category.strCategory}</h2>
                <p>{category.strCategoryDescription.slice(0, 150) + " ..."}</p>
                <Link
                  className="card-actions justify-end"
                  href={`/category/${category.strCategory}`}
                >
                  <button className="btn btn-primary">Explore</button>
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
