"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

function RecipeForm() {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      dishType: "Snack",
      cuisine: "Indian",
      dietaryRestrictions: [],
      spiceLevel: "Spicy"
    },
  });

  const [recipe, setRecipe] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);

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

  const handleReset = () => {
    reset();
    setRecipe(null);
    setShowRecipe(false);
  };

  return (
    <div className="min-h-screen py-10 bg-base-300 flex flex-col justify-center items-center relative">
      <button
        className="btn btn-circle bg-base-content hover:bg-neutral-content absolute top-5 md:top-10 left-3 md:left-10"
        onClick={() => router.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path d="M20 11H7.41l2.29-2.29A1 1 0 1 0 8.29 7.29L3.71 12l4.59 4.59a1 1 0 0 0 1.42-1.42L7.41 13H20a1 1 0 0 0 0-2z" />
        </svg>
      </button>
      {showRecipe && recipe ? (
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {recipe.area}
              </span>
              <span className="badge badge-success flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {recipe.category}
              </span>
            </div>
            <div>
              <h2 className="text-xl text-neutral-content font-semibold mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Instructions
              </h2>
              <p className="text-base-content">{recipe.steps.join("\n")}</p>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl p-6 bg-base-100 rounded-lg shadow-xl"
        >
          <InputField label="Describe about dish:" name="userPrompt" register={register} />

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

function SelectField({ label, name, options, register }) {
  return (
    <div className="form-control mb-4 min-w-64">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select {...register(name)} className="select select-bordered w-full">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckboxField({ label, name, options, register }) {
  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            className="label cursor-pointer flex items-center space-x-2"
            key={option}
          >
            <input
              type="checkbox"
              value={option}
              {...register(name)}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function InputField({ label, name, register }) {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const startListening = () => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative w-full">
        <input
          type="text"
          {...register(name)}
          value={inputValue}
          onChange={handleInputChange}
          className="input input-bordered w-full pr-16" // Increased padding for buttons
        />

        <button
          type="button"
          onClick={startListening}
          className={`absolute top-1/2 right-12 transform -translate-y-1/2 btn btn-circle btn-sm ${isListening ? "btn-secondary" : "btn-primary"
            }`}
          disabled={isListening}
        >
          {isListening ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#d31212"
                d="M8 6h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3m5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72z"
              />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={handleClearInput}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 btn btn-circle btn-sm btn-error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default RecipeForm;
