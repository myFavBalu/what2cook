import {useEffect, useState} from "react";
import s from "./SearchBarWithRecommendations.module.scss"
import {MealSearchResult} from "../../Types/MealTypes";
import {useNavigate} from "react-router-dom";
import {getMealIdByName} from "../../ApiCalls/getMealIdByName";


export function SearchBarWithRecommendations(): JSX.Element {
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [searchTerm, setSearchTerm] = useState<string>("Suche...")
    const [possibleResults, setPossibleResults] = useState<Array<MealSearchResult>>([])

    useEffect(() => {
        if (!isFirstRender) {
            if (searchTerm === "") {
                setPossibleResults([])
            } else {
                const delayDebounceFn = setTimeout(() => {
                    getMealIdByName(searchTerm).then(setPossibleResults)
                }, 500)

                return () => clearTimeout(delayDebounceFn)
            }
        } else setIsFirstRender(false)
    }, [searchTerm])

    return <>
        <input name={"SearchBar"} className={s.SearchBar} value={searchTerm} onFocus={(event) => {
            if (event.target.value === "Suche...") {
                setSearchTerm("")
            }
        }} onChange={(e) => setSearchTerm(e.target.value)}/>
        {possibleResults.length > 0 &&
            <SearchResultContainer possibleResults={possibleResults}
                                   resetSearchTerm={() => setSearchTerm("Suche...")}/>}
    </>
}


type SearchResultContainerProps = {
    possibleResults: Array<MealSearchResult>,
    resetSearchTerm: () => void
}

function SearchResultContainer(props: SearchResultContainerProps) {
    const containerArray: Array<JSX.Element> = [];
    const navigation = useNavigate()

    props.possibleResults.forEach((result, index) => {
        containerArray.push(
            <div className={s.SearchResultItem}
                 key={index}
                 onClick={() => {
                     props.resetSearchTerm()
                     navigation({pathname: "/generate", search: "?recipeId=" + result.id})
                 }}
            >
                {result.name}
            </div>)
    })

    return <div className={s.SearchResultContainer}>
        {containerArray}
    </div>
}
