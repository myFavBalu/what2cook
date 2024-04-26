import "./Navigation.scss"
import {NavLink} from "react-router-dom";
import {SearchBarWithRecommendations} from "../SearchBar/SearchBarWithRecommendations";

export function Navigation(): JSX.Element {
    return <div className={"NavigationWrapper"}>
        <NavLink className={"PageName"} to={"/"}>what2cook</NavLink>
        <div className={"ScrollablePageContainer"}>
            <NavLink className={"NavigationElement"} to={"/generate"}>Rezeptgenerator</NavLink>
            <NavLink className={"NavigationElement"} to={"/overview"}>Alle Rezepte</NavLink>
            <NavLink className={"NavigationElement"} to={"/create"}>Rezept anlegen</NavLink>
        </div>
        <div className={"NavigationSearchBarWrapper"}>
            <SearchBarWithRecommendations/>
        </div>
    </div>
}
