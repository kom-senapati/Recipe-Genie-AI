"use client";

import { useForm } from "react-hook-form";
import {
  CheckboxField,
  InputField,
  SelectField,
} from "@/components/FormComponents";

function GenerateRecipeForm({ setRecipe, setShowRecipe }) {

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
