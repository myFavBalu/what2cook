import {MealSearchResult} from "../../../Types/MealTypes";
import React, {useEffect, useState} from "react";
import "./Overview.scss"
import {getMealNamesWithIds} from "../../../ApiCalls/getMealNamesWithIds";
import {useNavigate} from "react-router-dom";


export function Overview(): JSX.Element {
    const [mealPlaceholders, setMealPlaceholders] = useState<MealSearchResult[]>([]);
    const navigation = useNavigate()

    useEffect(() => {
        getMealNamesWithIds().then((mealPlaceholders) => {
            setMealPlaceholders(mealPlaceholders)
        })
    }, [])

    if (mealPlaceholders.length === 0) {
        return <></>;
    }

    return <div className={"OverviewContainer"}>
        {mealPlaceholders.map((placeholder) =>
            <div className={"OverviewElement"} key={placeholder.id} onClick={() => {
                navigation({pathname: "/generate", search: "?recipeId=" + placeholder.id})
            }}>{placeholder.name}</div>)
        }
    </div>;
}