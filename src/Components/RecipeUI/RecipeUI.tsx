import React from "react";
import {Recipe} from "../../Types/RecipeTypes";
import s from "./RecipeUI.module.scss"

type DisplayProps = {
    recipe: Recipe
}

export function RecipeUI({recipe}: DisplayProps) {
    const ingredients = recipe.ingredients.split("-");

    return <div className={s.RecipeForm}>
        <div className={s.RecipeName}>
            {recipe.name}
            <div className={s.TagContainer}>
                {recipe.tags.map(
                    (tag) =>
                        <div
                            className={s.Tag}
                            key={tag.id}>
                            {tag.name}
                        </div>)
                }
            </div>
        </div>
        <div className={s.RecipeIngredients}>
            {ingredients.map(
                (i) =>
                    <div
                        className={s.IngredientItem}
                        key={i}>
                        {i}
                    </div>)
            }
        </div>
        <div className={s.RecipeInstructions}>
            {recipe.instructions}
        </div>
    </div>
}
