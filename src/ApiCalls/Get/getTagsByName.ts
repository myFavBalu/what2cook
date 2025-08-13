import {TagSearchResult} from "../../Types/RecipeTypes";

export async function getTagsByName(searchName: string) {
    const url = "/api/find-tags-by-name?searchName=" + searchName;
    const response = await fetch(url);
    return await response.json() as Array<TagSearchResult>;
}