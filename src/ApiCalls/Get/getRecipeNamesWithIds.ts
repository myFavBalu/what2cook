import {RecipeSearchResult} from "../../Types/RecipeTypes";

export async function getRecipeNamesWithIds() {
    const url = "/api/all-names-with-id";
    const response = await fetch(url);
    return await response.json() as Array<RecipeSearchResult>;
}