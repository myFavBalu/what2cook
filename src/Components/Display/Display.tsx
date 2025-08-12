import React from "react";
import {Meal} from "../../Types/MealTypes";
import s from "./Display.module.scss"

type DisplayProps = {
    meal: Meal
}

export function Display(props: DisplayProps) {
    const ingredients = props.meal.ingredients.split("-");
    const displayIngredients: Array<JSX.Element> = [];
    ingredients.forEach((i) => displayIngredients.push(<div className={s.IngredientItem} key={i}>{i}</div>));

    return <div className={s.MealForm}>
        <div className={s.MealName}>
            {props.meal.name}
            <div
                className={props.meal.tags.some((tag) => tag.name === "vegetarisch") ? s.VeggieIcon : s.NoVeggieIcon}>V
            </div>
        </div>
        <div className={s.MealIngredients}>
            {displayIngredients}
        </div>
        <div className={s.MealInstructions}>
            {props.meal.instructions}
        </div>
    </div>
}