import {Meal} from "../../../Types/MealTypes";
import React, {useEffect, useState} from "react";
import "./Generator.scss";
import {Display} from "../../Display/Display";
import {useSearchParams} from "react-router-dom";
import {getMealById} from "../../../ApiCalls/getMealById";
import {getRandomMeal} from "../../../ApiCalls/getRandomMeal";

export function Generator(): JSX.Element {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [queryParams] = useSearchParams();

    useEffect(() => {
        const recipeId = queryParams.get("recipeId")
        if (recipeId) {
            getMealById(parseInt(recipeId)).then((newMeal) => setMeal(newMeal))
        } else {
            getRandomMeal(null).then((newMeal) => setMeal(newMeal))
        }
    }, [queryParams])


    if (meal === null) {
        return <></>
    } else {
        return <>
            <Display meal={meal}/>
            <button className={"Reroll"} onClick={() => getRandomMeal(meal).then(setMeal)}>Etwas anderes!</button>
        </>
    }
}
