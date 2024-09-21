"use client";

import AiRecipe from "@/components/AiRecipe";
import BackButton from "@/components/BackButton";
import GenerateRecipeForm from "@/components/GenerateRecipeForm";
import { useState } from "react";

/**
 * The Page component manages the state and display of a recipe generation form and the generated recipe.
 *
 * - Shows a form to generate a recipe.
 * - Displays the generated recipe when available.
 * - Provides buttons to clear the recipe or view it.
 */
function Page() {
  const [recipe, setRecipe] = useState(null);
  const [recipeImageUrl, setRecipeImageUrl] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);

  const handleReset = () => {
    setRecipe(null);
    setShowRecipe(false);
  };

  return (
    <div className="min-h-screen py-10 bg-base-300 flex flex-col justify-center items-center relative">
      <BackButton />

      {showRecipe && recipe ? (
        <AiRecipe
          recipe={recipe}
          recipeImageUrl={recipeImageUrl}
          setShowRecipe={setShowRecipe}
        />
      ) : (
        <GenerateRecipeForm
          setRecipe={setRecipe}
          setShowRecipe={setShowRecipe}
          setRecipeImageUrl={setRecipeImageUrl}
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
