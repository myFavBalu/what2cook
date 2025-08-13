import s from "./Navigation.module.scss"
import {NavLink, useNavigate} from "react-router-dom";
import {SearchBarWithRecommendations} from "../SearchBar/SearchBarWithRecommendations";
import {getRecipeIdByName} from "../../ApiCalls/Get/getRecipeIdByName";

export function Navigation(): JSX.Element {
    const navigation = useNavigate()

    return <div className={s.NavigationWrapper}>
        <NavLink className={s.PageName} to={"/"}>what2cook</NavLink>
        <div className={s.ScrollablePageContainer}>
            <NavLink className={s.NavigationElement} to={"/generate"}>Rezeptgenerator</NavLink>
            <NavLink className={s.NavigationElement} to={"/overview"}>Alle Rezepte</NavLink>
            <NavLink className={s.NavigationElement} to={"/create"}>Rezept anlegen</NavLink>
        </div>
        <div className={s.NavigationSearchBarWrapper}>
            <SearchBarWithRecommendations
                onResultClicked={(searchResult) => navigation({
                    pathname: "/generate",
                    search: "?recipeId=" + searchResult.id
                })}
                getCall={getRecipeIdByName}
                onAddResultClicked={()=>navigation({pathname: '/create'})}
            />
        </div>
    </div>
}
