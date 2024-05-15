import {MealSearchResult} from "../../../Types/MealTypes";
import React, {useEffect, useState} from "react";
import s from "./Overview.module.scss"
import {getMealNamesWithIds} from "../../../ApiCalls/getMealNamesWithIds";

export function Overview(): JSX.Element {
    const [mealPlaceholders, setMealPlaceholders] = useState<MealSearchResult[]>([]);

    useEffect(() => {
        getMealNamesWithIds().then((mealPlaceholders) => {
            setMealPlaceholders(mealPlaceholders)
        })
    }, [])

    if (mealPlaceholders.length === 0) {
        return <></>;
    }

    return <div className={s.OverviewContainer}>
        {mealPlaceholders.map((placeholder) =>
            <a className={s.OverviewElement}
               key={placeholder.id}
               href={"/generate?recipeId=" + placeholder.id}
            >{placeholder.name}</a>)
        }
    </div>;
}