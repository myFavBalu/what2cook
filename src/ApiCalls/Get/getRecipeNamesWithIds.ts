import {RecipeSearchResult, Tag} from "../../Types/RecipeTypes";

export async function getRecipeNamesWithIds(filterTags: Tag[]) {
    const url = new URL("/api/all-names-with-id", window.location.origin)

    filterTags.forEach((tag) => url.searchParams.append("filterTags[]", tag.name))

    const response = await fetch(url);
    return await response.json() as Array<RecipeSearchResult>;
}