export type Meal = {
    id: number,
    name: string,
    ingredients: string,
    instructions: string,
    tags: Tag[],
}

export type Tag = {
    id: number,
    name: string,
}

export type MealCreation = {
    name: string,
    ingredients: string[],
    instructions: string,
    vegetarian: boolean,
}

export type MealSearchResult = {
    id: number,
    name: string
}