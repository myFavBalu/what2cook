import {useEffect, useState} from "react";
import "./SearchBarWithRecommendations.scss"
import {MealSearchResult} from "../../Types/MealTypes";
import {useNavigate} from "react-router-dom";


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
                    getMealIdByName(searchTerm, setPossibleResults).catch(() => setPossibleResults([{
                        name: "a",
                        id: 1
                    }, {name: "b", id: 2}]));
                    console.log(possibleResults)
                }, 750)

                return () => clearTimeout(delayDebounceFn)
            }
        } else setIsFirstRender(false)
    }, [searchTerm])

    useEffect(() => {

    }, [possibleResults])

    return <div className={"SearchBarWrapper"}>
        <input className={"SearchBar"} value={searchTerm} onFocus={(event) => {
            if (event.target.value === "Suche...") {
                setSearchTerm("")
            }
        }} onChange={(e) => setSearchTerm(e.target.value)}/>
        {possibleResults.length > 0 &&
            <SearchResultContainer possibleResults={possibleResults} resetSearchTerm={() => setSearchTerm("")}/>}
    </div>
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
            <div className={"SearchResultItem"}
                 key={index}
                 onClick={() => {
                     props.resetSearchTerm()
                     navigation({pathname: "/generate", search: "?recipeId=" + result.id})
                 }}
            >
                {result.name}
            </div>)
    })

    return <div className={"SearchResultContainer"}>
        {containerArray}
    </div>
}

async function getMealIdByName(searchName: string, setPossibleResults: (possibleResults: Array<MealSearchResult>) => void) {
    const url = "/api/find-id-by-name?searchName=" + searchName;
    const response = await fetch(url);
    const possibleResults = await response.json() as Array<MealSearchResult>;
    setPossibleResults(possibleResults);
}


