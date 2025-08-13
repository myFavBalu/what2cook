import {RecipeCreation} from "../../Types/RecipeTypes";

export async function addRecipe(newRecipe: RecipeCreation) {
    const url = '/api/add-recipe';
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: newRecipe.name,
            ingredients: "- " + newRecipe.ingredients.join("- "),
            instructions: newRecipe.instructions,
            // TODO: proper implementation of tags for the frontend, needs ui in this component and similar logic to searchbar regarding suggestions
            tags: newRecipe.vegetarian ? ['vegetarisch'] : []
        })
    };
    return await fetch(url, requestOptions)
}