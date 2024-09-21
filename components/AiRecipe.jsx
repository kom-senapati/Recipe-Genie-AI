import { PlusIcon2, PlusIcon } from "@/components/Icons";
import TextToSpeech from "./TextToSpeech";

/**
 * The AiRecipe component displays a detailed view of a recipe.
 *
 * - Shows the recipe name, area, and category.
 * - Lists the ingredients and their amounts.
 * - Provides the cooking instructions.
 * - Includes a button to close the recipe view.
 */
export default function AiRecipe({ recipe, setShowRecipe, recipeImageUrl }) {
  return (
    <div className="max-w-96 md:max-w-7xl w-full bg-base-200 text-base-content shadow-md rounded-lg overflow-hidden">
      <button
        className="absolute top-10 right-10 btn btn-sm btn-secondary"
        onClick={() => setShowRecipe(false)}
      >
        Close
      </button>
      <div className="px-10 md:px-20 py-10">
        <h1 className="text-3xl md:text-4xl text-center font-bold text-primary mb-4">
          {recipe.name} 🍲
        </h1>
        <div className="flex flex-col md:flex-row gap-10">
          <div>
            {recipeImageUrl && (
              <img
                src={recipeImageUrl}
                alt={recipe.name}
                className="max-w-72 md:max-w-xl h-auto rounded-lg mb-4"
              />
            )}
            <div className="flex items-center space-x-4 mb-4">
              <span className="badge badge-primary">{recipe.area}</span>
              <span className="badge badge-success">{recipe.category}</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl text-neutral-content font-semibold mb-2 flex items-center">
              <PlusIcon />
              <span className="ml-2">Ingredients</span>
            </h2>
            <table className="w-full mb-4">
              <tbody>
                {recipe.ingredients.map(({ name, amount }, index) => (
                  <tr key={index}>
                    <td className="py-1 pr-4">{name}</td>
                    <td className="py-1">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl text-neutral-content font-semibold mb-2 flex items-center">
            <PlusIcon2 />
            Instructions
          </h2>
          <p className="text-base-content">{recipe.steps.join("\n")}</p>
          <TextToSpeech text={recipe.steps.join(" ")} />
        </div>
      </div>
    </div>
  );
}
