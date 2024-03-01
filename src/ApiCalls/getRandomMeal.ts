import {Meal} from "../Types/MealTypes";

export async function getRandomMeal(currentMeal: Meal | null): Promise<Meal> {
        const url = currentMeal ? '/api/recipe?currentRecipe=' + currentMeal.id : '/api/recipe';
        const response = await fetch(url);
        return await response.json() as Meal;
}