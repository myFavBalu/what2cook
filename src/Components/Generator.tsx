import {Meal} from "../Types/GeneratorTypes";
import React, {Dispatch, SetStateAction, useState} from "react";
import "./Generator.scss";

export function Generator(): JSX.Element {
    const [meal, setMeal] = useState<Meal | null>(null);

    if (meal === null) {
        return <button className={"Reroll"} onClick={() => getMeal(setMeal, meal)}>Dreh das Rad!</button>
    }

    return renderMeal(meal, setMeal);
}

async function getMeal(setMeal: Dispatch<SetStateAction<Meal | null>>, currentMeal: Meal | null) {
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

function renderMeal(meal: Meal, setMeal: Dispatch<SetStateAction<Meal | null>>): JSX.Element {
    const ingredients = meal.ingredients.split("-");
    const displayIngredients: Array<JSX.Element> = [];
    ingredients.forEach((i) => displayIngredients.push(<div className={"IngredientItem"} key={i}>{i}</div>));
    return <div className={"MealForm"}>
        <div className={"MealName"}>
            {meal.name}
            <div className={meal.vegetarian ? "VeggieIcon" : "NoVeggieIcon"}>V</div>
        </div>
        <div className={"MealIngredients"}>
            {displayIngredients}
        </div>
        <div className={"MealInstructions"}>
            {meal.instructions}
        </div>
        <button className={"Reroll"} onClick={() => getMeal(setMeal, meal)}>Etwas anderes!</button>
    </div>
}
