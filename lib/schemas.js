import { z } from "zod";

const ingredientSchema = z.object({
    name: z.string().describe('The name of the ingredient.'),
    amount: z.string().describe('The quantity of the ingredient.'),
}).describe('An object representing an ingredient.');

export const recipeSchema = z.object({
    recipe: z.object({
        name: z.string().describe('The name of the recipe.'),
        area: z.string().describe('The geographical region or style of cuisine associated with the recipe.'),
        category: z.string().describe('The category of the recipe, such as appetizer, main course, or dessert.'),
        ingredients: z.array(ingredientSchema).describe('A list of ingredients required for the recipe.'),
        steps: z.array(z.string()).describe('A list of steps to prepare the recipe.'),
    }).describe('The main recipe object.'),
});