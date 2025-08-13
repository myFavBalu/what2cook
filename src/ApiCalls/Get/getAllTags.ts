import {TagSearchResult} from "../../Types/RecipeTypes";

export async function getAllTags() {
    const url = "/api/get_all_tags";
    const response = await fetch(url);
    return await response.json() as Array<TagSearchResult>;
}