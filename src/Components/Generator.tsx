import {Meal} from "../Types/MealTypes";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import "./Generator.scss";
import {Display} from "./Display";
import {useSearchParams} from "react-router-dom";

export function Generator(): JSX.Element {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [queryParams] = useSearchParams();

    useEffect(() => {
        const recipeId = queryParams.get("recipeId")
        if (recipeId) {
            getMealById(parseInt(recipeId)).then((newMeal) => setMeal(newMeal))
        }
    }, [queryParams])
    if (meal === null) {
        return <button className={"Reroll"} onClick={() => getRandomMeal(setMeal, meal)}>Dreh das Rad!</button>
    }

    return <>
        <Display meal={meal}/>
        <button className={"Reroll"} onClick={() => getRandomMeal(setMeal, meal)}>Etwas anderes!</button>
    </>
}


// Todo move requests to own class for reusability, also getRandomMeal should return a Meal, not set it
async function getRandomMeal(setMeal: Dispatch<SetStateAction<Meal | null>>, currentMeal: Meal | null) {
    try {
        // @todo: move from local to prod (better yet, implement handling for both), also implement working headers
        const url = currentMeal ? '/api/recipe?currentRecipe=' + currentMeal.id : '/api/recipe';
        const response = await fetch(url);
        const meal = await response.json() as Meal;
        setMeal(meal)
    } catch (error) {
        setMeal(null);
    }
}

async function getMealById(id: Number) {
    const url = "/api/find-by-id?recipeId=" + id
    const response = await fetch(url)
    return await response.json() as Meal
}
