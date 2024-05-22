"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Search from "@/components/search";

function page() {
  const [categories, setCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleSearchBlur = () => {
    setIsSearching(false);
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

  return (
    <>
      <div className="navbar bg-base-100 flex flex-col md:flex-row">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">🍱 Recipe Genie</a>
        </div>
        <Search
          handleSearchBlur={handleSearchBlur}
          handleSearchFocus={handleSearchFocus}
          isFocused={isSearching}
        />
      </div>

      <div
        className={`flex flex-col items-center justify-center p-5 md:p-10 w-full bg-base-300 ${
          !isSearching ? "opacity-100" : "opacity-80 blur-sm"
        }`}
      >
        <h1 className="text-xl md:text-3xl text-primary mb-10">
          Start Your Food Adventure
        </h1>
        <Link href="/random">
          <button className="btn btn-primary">Enjoy a Surprise Meal</button>
        </Link>
        <div className="divider">OR</div>
        <h1 className="text-xl md:text-2xl text-primary mb-10">
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
    </>
  );
}
export default page;
