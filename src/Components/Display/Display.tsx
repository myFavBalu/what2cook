import React from "react";
import {Recipe} from "../../Types/RecipeTypes";
import s from "./Display.module.scss"

type DisplayProps = {
    recipe: Recipe
}

export function Display({recipe}: DisplayProps) {
    const ingredients = recipe.ingredients.split("-");

    const displayIngredients = ingredients.map(
        (i) =>
            <div
                className={s.IngredientItem}
                key={i}>
                {i}
            </div>);
    const displayTags = recipe.tags.map(
        (tag) =>
            <div
                className={s.Tag}
                key={tag.id}>
                {tag.name}
            </div>);

    return <div className={s.RecipeForm}>
        <div className={s.RecipeName}>
            {recipe.name}
            <div className={s.TagContainer}>
                {displayTags}
            </div>
        </div>
        <div className={s.RecipeIngredients}>
            {displayIngredients}
        </div>
        <div className={s.RecipeInstructions}>
            {recipe.instructions}
        </div>
    </div>
}
