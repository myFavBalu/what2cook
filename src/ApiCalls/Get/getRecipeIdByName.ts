import {RecipeSearchResult} from "../../Types/RecipeTypes";

export async function getRecipeIdByName(searchName: string) {
    const url = "/api/find-id-by-name?searchName=" + searchName;
    const response = await fetch(url);
    return await response.json() as Array<RecipeSearchResult>;
}