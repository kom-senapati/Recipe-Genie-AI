"use client";

import { useForm } from "react-hook-form";
import {
  CheckboxField,
  InputField,
  SelectField,
} from "@/components/FormComponents";

/**
 * The GenerateRecipeForm component provides a form for users to input details to generate a recipe.
 *
 * - Allows users to describe the dish.
 * - Lets users select the type of dish, cuisine preference, dietary restrictions, and spice level.
 * - Submits the form data to generate a recipe and displays it.
 *
 * @param {Function} setRecipe - Function to set the generated recipe.
 * @param {Function} setShowRecipe - Function to show the generated recipe.
 */
function GenerateRecipeForm({ setRecipe, setShowRecipe, setRecipeImageUrl }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      dishType: "Snack",
      cuisine: "Indian",
      dietaryRestrictions: [],
      spiceLevel: "Spicy",
    },
  });

  const onSubmit = async (data) => {
    const res = await fetch("/api/generate-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const recipe = await res.json();
    setRecipe(recipe.recipe);

    const imagePrompt = await `${data.userPrompt}, ${recipe.recipe.name}`;
    const resImage = await fetch("/api/generate-recipe-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: imagePrompt }),
    });
    setRecipeImageUrl((await resImage.json()).url);

    setShowRecipe(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl p-6 bg-base-100 rounded-lg shadow-xl"
    >
      <InputField
        label="Describe about dish:"
        name="userPrompt"
        register={register}
      />

      <div className="flex w-full justify-between">
        <SelectField
          label="Type of Dish:"
          name="dishType"
          options={[
            "",
            "Appetizer",
            "Main Course",
            "Dessert",
            "Snack",
            "Beverage",
          ]}
          register={register}
        />

        <SelectField
          label="Cuisine Preference:"
          name="cuisine"
          options={[
            "",
            "Italian",
            "Mexican",
            "Indian",
            "Chinese",
            "American",
            "Mediterranean",
          ]}
          register={register}
        />
      </div>

      <CheckboxField
        label="Dietary Restrictions:"
        name="dietaryRestrictions"
        options={[
          "Vegetarian",
          "Vegan",
          "Gluten-Free",
          "Dairy-Free",
          "Nut-Free",
          "Halal",
        ]}
        register={register}
      />

      <SelectField
        label="Spice Level:"
        name="spiceLevel"
        options={["", "Mild", "Medium", "Spicy", "Extra Spicy"]}
        register={register}
      />

      <button type="submit" className="btn btn-primary w-full">
        Generate Recipe
      </button>
    </form>
  );
}

export default GenerateRecipeForm;
