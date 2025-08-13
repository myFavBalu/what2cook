import {Recipe} from "../../Types/RecipeTypes";

export async function getRecipeById(id: Number) {
    const url = "/api/find-by-id?recipeId=" + id
    const response = await fetch(url)
    return await response.json() as Recipe
}