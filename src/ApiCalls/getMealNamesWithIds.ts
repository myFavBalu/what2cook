import {MealSearchResult} from "../Types/MealTypes";

export async function getMealNamesWithIds() {
    const url = "/api/all-names-with-id";
    const response = await fetch(url);
    return await response.json() as Array<MealSearchResult>;
}