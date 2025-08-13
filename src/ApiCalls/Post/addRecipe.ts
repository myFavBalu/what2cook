import {RecipeCreation} from "../../Types/RecipeTypes";

export async function addRecipe(newRecipe: RecipeCreation) {
    const url = '/api/add-recipe';
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: jsonSerialize(newRecipe)
    };
    return await fetch(url, requestOptions)
}

function jsonSerialize(recipe: RecipeCreation): string {
    return JSON.stringify({
        name: recipe.name,
        ingredients: "- " + recipe.ingredients.join("- "),
        instructions: recipe.instructions,
        tags: recipe.tags
    })
}