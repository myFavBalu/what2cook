import {MealSearchResult} from "../../../Types/MealTypes";
import React, {useEffect, useState} from "react";
import {getMealNamesWithIds} from "../../../ApiCalls/getMealNamesWithIds";


export function Overview(): JSX.Element {
    const [mealPlaceholders, setMealPlaceholders] = useState<MealSearchResult[]>([]);

    useEffect(() => {
        getMealNamesWithIds().then((mealPlaceholders) => {
            setMealPlaceholders(mealPlaceholders)
        })
    }, [])

    return <div>
        {mealPlaceholders.map((placeholder) => <div>{placeholder.name}</div>)}
    </div>;
}