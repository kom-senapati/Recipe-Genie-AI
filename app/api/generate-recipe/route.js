import { model } from "@/lib/groq";
import { recipeSchema } from "@/lib/schemas";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const cuisine = "Indian";
    const dishType = "Curry";
    const spiceLevel = "Mild";

    const prompt = `Generate a ${body.cuisine ?? cuisine} recipe for ${body.dishType ?? dishType
      } (with ${body.spiceLevel ?? spiceLevel} spice level if applicable).
      
      ${body.dietaryRestrictions
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
