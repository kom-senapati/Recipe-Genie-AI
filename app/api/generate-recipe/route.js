import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const model = groq("llama3-8b-8192");

const ingredientSchema = z.object({
  name: z.string().describe('The name of the ingredient.'),
  amount: z.string().describe('The quantity of the ingredient.'),
}).describe('An object representing an ingredient.');

const recipeSchema = z.object({
  recipe: z.object({
    name: z.string().describe('The name of the recipe.'),
    area: z.string().describe('The geographical region or style of cuisine associated with the recipe.'),
    category: z.string().describe('The category of the recipe, such as appetizer, main course, or dessert.'),
    ingredients: z.array(ingredientSchema).describe('A list of ingredients required for the recipe.'),
    steps: z.array(z.string()).describe('A list of steps to prepare the recipe.'),
  }).describe('The main recipe object.'),
});

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
