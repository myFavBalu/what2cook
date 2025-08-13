import {useEffect, useState} from "react";
import s from "./SearchBarWithRecommendations.module.scss"
import {SearchResult} from "../../Types/RecipeTypes";


export type SearchBarWithRecommendationsProps = {
    getCall: (searchWord: string) => Promise<SearchResult[]>,
    onResultClicked: (value: SearchResult) => void
}

export function SearchBarWithRecommendations({
                                                 getCall,
                                                 onResultClicked
                                             }: SearchBarWithRecommendationsProps): JSX.Element {
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [searchTerm, setSearchTerm] = useState<string>("Suche...")
    const [possibleResults, setPossibleResults] = useState<Array<SearchResult>>([])

    useEffect(() => {
        if (!isFirstRender) {
            if (searchTerm === "") {
                setPossibleResults([])
            } else {
                const delayDebounceFn = setTimeout(() => {
                    getCall(searchTerm).then(setPossibleResults)
                }, 500)

                return () => clearTimeout(delayDebounceFn)
            }
        } else setIsFirstRender(false)
    }, [searchTerm])

    return <div className={s.SearchBarWrapper}>
        <input name={"SearchBar"} className={s.SearchBar} value={searchTerm} onFocus={(event) => {
            if (event.target.value === "Suche...") {
                setSearchTerm("")
            }
        }} onChange={(e) => setSearchTerm(e.target.value)}/>
        {possibleResults.length > 0 &&
            <SearchResultContainer possibleResults={possibleResults}
                                   onResultClicked={onResultClicked}
                                   resetSearchTerm={() => setSearchTerm("Suche...")}/>}
    </div>
}


type SearchResultContainerProps = {
    possibleResults: Array<SearchResult>,
    onResultClicked: (value: SearchResult) => void
    resetSearchTerm: () => void
}

function SearchResultContainer({possibleResults, onResultClicked, resetSearchTerm}: SearchResultContainerProps) {
    const containerArray: Array<JSX.Element> = [];

    possibleResults.forEach((result, index) => {
        containerArray.push(
            <div className={s.SearchResultItem}
                 key={index}
                 onClick={() => {
                     resetSearchTerm()
                     onResultClicked(result)
                 }}
            >
                {result.name}
            </div>)
    })

    return <div className={s.SearchResultContainer}>
        {containerArray}
    </div>
}
