import {RecipeSearchResult} from "../../../Types/RecipeTypes";
import React, {useEffect, useState} from "react";
import s from "./Overview.module.scss"
import {getRecipeNamesWithIds} from "../../../ApiCalls/Get/getRecipeNamesWithIds";

export function Overview(): JSX.Element {
    const [recipePlaceholders, setRecipePlaceholders] = useState<RecipeSearchResult[]>([]);

    useEffect(() => {
        getRecipeNamesWithIds().then((recipePlaceholders) => {
            setRecipePlaceholders(recipePlaceholders)
        })
    }, [])

    if (recipePlaceholders.length === 0) {
        return <></>;
    }

    return <div className={s.OverviewContainer}>
        {recipePlaceholders.map((placeholder) =>
            <a className={s.OverviewElement}
               key={placeholder.id}
               href={"/generate?recipeId=" + placeholder.id}
            >{placeholder.name}</a>)
        }
    </div>;
}