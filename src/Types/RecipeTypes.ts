export type Recipe = {
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

export type RecipeCreation = {
    name: string,
    ingredients: string[],
    instructions: string,
    vegetarian: boolean,
}

export interface SearchResult {
    id: number,
    name: string
}

export type RecipeSearchResult = SearchResult

export type TagSearchResult = SearchResult