import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    console.log(body);

    const cuisine = "Indian";
    const dishType = "Curry";
    const spiceLevel = "Mild";

    const prompt = `Generate a ${body.cuisine ?? cuisine} recipe for ${
      body.dishType ?? dishType
    } with ${body.spiceLevel ?? spiceLevel} spice level.
      
      ${
        body.dietaryRestrictions
          ? `Dietary Restrictions - ${body.dietaryRestrictions.join(", ")}`
          : ""
      }`;

    console.log(prompt);

    const result = await generateObject({
      model: groq("mixtral-8x7b-32768"),
      schema: z.object({
        recipe: z.object({
          name: z.string(),
          area: z.string(),
          category: z.string(),
          ingredients: z.array(
            z.object({
              name: z.string(),
              amount: z.string(),
            })
          ),
          steps: z.array(z.string()),
        }),
      }),
      prompt: prompt,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json({ error: "Failed to generate recipe." });
  }
}
