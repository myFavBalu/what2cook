import s from "./Navigation.module.scss"
import {NavLink} from "react-router-dom";
import {SearchBarWithRecommendations} from "../SearchBar/SearchBarWithRecommendations";

export function Navigation(): JSX.Element {
    return <div className={s.NavigationWrapper}>
        <NavLink className={s.PageName} to={"/"}>what2cook</NavLink>
        <div className={s.ScrollablePageContainer}>
            <NavLink className={s.NavigationElement} to={"/generate"}>Rezeptgenerator</NavLink>
            <NavLink className={s.NavigationElement} to={"/overview"}>Alle Rezepte</NavLink>
            <NavLink className={s.NavigationElement} to={"/create"}>Rezept anlegen</NavLink>
        </div>
        <div className={s.NavigationSearchBarWrapper}>
            <SearchBarWithRecommendations/>
        </div>
    </div>
}
