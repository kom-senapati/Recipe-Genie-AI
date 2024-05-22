"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Search = ({ handleSearchFocus, handleSearchBlur, isFocused }) => {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState([]);
  const inputRef = useRef(null);

  const fetchMeals = (value) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals));
  };

  const handleSearch = (value) => {
    setInput(value);
    if (!value) {
      setMeals([]);
      return;
    }
    fetchMeals(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Search for your meal"
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          ref={inputRef}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="w-4 h-4 cursor-pointer"
          stroke="currentColor"
          onClick={() => handleSearch("")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </label>

      {meals && meals.length !== 0 && (
        <div className="w-80 max-h-80 overflow-y-scroll no-scrollbar bg-neutral p-2 rounded-xl flex flex-col gap-2 absolute top-32 md:top-20 md:right-0 z-10">
          {meals.map((meal) => (
            <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`}>
              <div className="hover:bg-base-100 p-1 rounded-xl flex items-center justify-start gap-3">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-10 h-10 rounded-full"
                />
                <span>{meal.strMeal}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default Search;
