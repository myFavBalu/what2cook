export type Meal = {
    id: number,
    name: string,
    ingredients: string,
    instructions: string,
    vegetarian: boolean
}

export type MealCreation = {
    name: string,
    ingredients: string[],
    instructions: string,
    vegetarian: boolean,
}