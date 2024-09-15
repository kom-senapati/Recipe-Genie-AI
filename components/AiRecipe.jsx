import { PlusIcon2, PlusIcon3 } from "@/components/Icons";
import TextToSpeech from "./TextToSpeech";

export default function AiRecipe({ recipe, setShowRecipe }) {
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
        <div className="flex items-center space-x-4 mb-4">
          <span className="badge badge-primary flex items-center">
            <PlusIcon3 />
            {recipe.area}
          </span>
          <span className="badge badge-success flex items-center">
            <PlusIcon3 />
            {recipe.category}
          </span>
        </div>
        <div>
          <h2 className="text-xl text-neutral-content font-semibold mb-2 flex items-center">
            <PlusIcon2 />
            Ingredients
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
