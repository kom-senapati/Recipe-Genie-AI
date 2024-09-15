import { model } from "@/lib/groq";
import { recipeSchema } from "@/lib/schemas";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

/**
 * Handles POST requests to generate a recipe based on user input.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a JSON response containing the generated recipe or an error message.
 *
 * The function performs the following steps:
 * 1. Parses the JSON body of the request.
 * 2. Sets default values for cuisine, dish type, and spice level.
 * 3. Constructs a prompt for generating the recipe, incorporating user-provided values and dietary restrictions if available.
 * 4. Calls the `generateObject` function with the constructed prompt to generate the recipe.
 * 5. Returns the generated recipe as a JSON response.
 * 6. Catches and logs any errors, returning an error message as a JSON response.
 */
export async function POST(req) {
  try {
    const body = await req.json();

    const cuisine = "Indian";
    const dishType = "Curry";
    const spiceLevel = "Mild";

    const prompt = `Generate a ${body.cuisine ?? cuisine} recipe for ${
      body.dishType ?? dishType
    } (with ${body.spiceLevel ?? spiceLevel} spice level if applicable).
      
      ${
        body.dietaryRestrictions
          ? `Dietary Restrictions - ${body.dietaryRestrictions.join(", ")}`
          : ""
      }
      
      ${body.userPrompt}
      
      Give a simple name of 2-3 words to the recipe.`;

    const result = await generateObject({
      model,
      schema: recipeSchema,
      prompt,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json({ error: "Failed to generate recipe." });
  }
}
