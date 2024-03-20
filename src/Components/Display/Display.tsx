import React from "react";
import {Meal} from "../../Types/MealTypes";
import "./Display.scss"

type DisplayProps = {
    meal: Meal
}
export function Display(props: DisplayProps) {
    const ingredients = props.meal.ingredients.split("-");
    const displayIngredients: Array<JSX.Element> = [];
    ingredients.forEach((i) => displayIngredients.push(<div className={"IngredientItem"} key={i}>{i}</div>));

    return <div className={"MealForm"}>
        <div className={"MealName"}>
            {props.meal.name}
            <div className={props.meal.vegetarian ? "VeggieIcon" : "NoVeggieIcon"}>V</div>
        </div>
        <div className={"MealIngredients"}>
            {displayIngredients}
        </div>
        <div className={"MealInstructions"}>
            {props.meal.instructions}
        </div>
    </div>
}