import {MealSearchResult} from "../Types/MealTypes";

export async function getMealIdByName(searchName: string) {
    const url = "/api/find-id-by-name?searchName=" + searchName;
    const response = await fetch(url);
    return await response.json() as Array<MealSearchResult>;
}