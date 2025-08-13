import React from "react";
import {Recipe} from "../../Types/RecipeTypes";
import s from "./Display.module.scss"

type DisplayProps = {
    recipe: Recipe
}

export function Display(props: DisplayProps) {
    const ingredients = props.recipe.ingredients.split("-");
    const displayIngredients: Array<JSX.Element> = [];
    ingredients.forEach((i) => displayIngredients.push(<div className={s.IngredientItem} key={i}>{i}</div>));

    return <div className={s.RecipeForm}>
        <div className={s.RecipeName}>
            {props.recipe.name}
            <div
                className={props.recipe.tags.some((tag) => tag.name === "vegetarisch") ? s.VeggieIcon : s.NoVeggieIcon}>V
            </div>
        </div>
        <div className={s.RecipeIngredients}>
            {displayIngredients}
        </div>
        <div className={s.RecipeInstructions}>
            {props.recipe.instructions}
        </div>
    </div>
}