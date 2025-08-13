import {Recipe} from "../../Types/RecipeTypes";

export async function getRandomRecipe(currentRecipe: Recipe | null): Promise<Recipe> {
        const url = currentRecipe ? '/api/recipe?currentRecipe=' + currentRecipe.id : '/api/recipe';
        const response = await fetch(url);
        return await response.json() as Recipe;
}