"use client";

import AiRecipe from "@/components/AiRecipe";
import BackButton from "@/components/BackButton";
import GenerateRecipeForm from "@/components/GenerateRecipeForm";
import { useState } from "react";

function Page() {
  const [recipe, setRecipe] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);

  const handleReset = () => {
    setRecipe(null);
    setShowRecipe(false);
  };

  return (
    <div className="min-h-screen py-10 bg-base-300 flex flex-col justify-center items-center relative">
      <BackButton />

      {showRecipe && recipe ? (
        <AiRecipe recipe={recipe} setShowRecipe={setShowRecipe} />
      ) : (
        <GenerateRecipeForm
          setRecipe={setRecipe}
          setShowRecipe={setShowRecipe}
        />
      )}

      {!showRecipe && (
        <div className="flex space-x-4 mt-5">
          <button className="btn btn-secondary btn-sm" onClick={handleReset}>
            Clear
          </button>
          {recipe && (
            <button
              className="btn btn-accent btn-sm"
              onClick={() => setShowRecipe(true)}
            >
              View Recipe
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
