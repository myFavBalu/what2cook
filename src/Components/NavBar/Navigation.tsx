import "./Navigation.scss"
import {NavLink} from "react-router-dom";
import {SearchBarWithRecommendations} from "./SearchBarWithRecommendations";

export function Navigation(): JSX.Element {
    return <div className={"NavigationWrapper"}>
        <NavLink className={"PageName"} to={"/"}>what2cook</NavLink>
        <NavLink className={"NavigationElement"} to={"/generate"}>Rezeptgenerator</NavLink>
        <NavLink className={"NavigationElement"} to={"/create"}>Gericht anlegen</NavLink>
        <SearchBarWithRecommendations/>
    </div>
}