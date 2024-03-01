import {Meal} from "../Types/MealTypes";

export async function getMealById(id: Number) {
    const url = "/api/find-by-id?recipeId=" + id
    const response = await fetch(url)
    return await response.json() as Meal
}