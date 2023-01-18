import {Meal} from "../Types/GeneratorTypes";
import React, {Dispatch, SetStateAction, useState} from "react";
import "./Generator.scss";

export function Generator(): JSX.Element {
    const [meal, setMeal] = useState<Meal | null>(null);

    if (meal === null) {
        return <button className={"FirstRoll"} onClick={() => getMeal(setMeal)}>Dreh das Rad!</button>
    }

    return renderMeal(meal, setMeal);
}

async function getMeal(setMeal: Dispatch<SetStateAction<Meal | null>>) {
    try {
        console.log("firing request");
        // @todo: move from local to prod (better yet, implement handling for both)
        const response = await fetch('http://127.0.0.1:8000/recipe');
        const meal = await response.json() as Meal;
        setMeal(meal)
    } catch (error) {
        console.log("Bumms")
        setMeal(null);
    }
}

function renderMeal(meal: Meal, setMeal: Dispatch<SetStateAction<Meal | null>>): JSX.Element {
    const ingredients = meal.ingredients.split("-");
    const displayIngredients: Array<JSX.Element> = [];
    ingredients.forEach((i) => displayIngredients.push(<div className={"IngredientItem"}>{i}</div>));
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
        <button className={"Reroll"} onClick={() => getMeal(setMeal)}>Etwas anderes!</button>
    </div>
}
