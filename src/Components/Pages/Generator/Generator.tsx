import {Recipe} from "../../../Types/RecipeTypes";
import React, {useEffect, useState} from "react";
import {RecipeUI} from "../../RecipeUI/RecipeUI";
import {useSearchParams} from "react-router-dom";
import {getRecipeById} from "../../../ApiCalls/Get/getRecipeById";
import {getRandomRecipe} from "../../../ApiCalls/Get/getRandomRecipe";
import {StickyButton} from "../../StickyButton/StickyButton";

export function Generator(): JSX.Element {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [queryParams] = useSearchParams();

    useEffect(() => {
        const recipeId = queryParams.get("recipeId")
        if (recipeId) {
            getRecipeById(parseInt(recipeId)).then((newRecipe) => setRecipe(newRecipe))
        } else {
            getRandomRecipe(null).then((newRecipe) => setRecipe(newRecipe))
        }
    }, [queryParams])


    if (recipe === null) {
        return <></>
    } else {
        return <>
            <RecipeUI recipe={recipe}/>
            <StickyButton onClick={() => getRandomRecipe(recipe).then(setRecipe)}>Etwas anderes!</StickyButton>
        </>
    }
}
