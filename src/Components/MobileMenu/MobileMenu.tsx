import "./MobileMenu.scss"
import {BurgerMenu} from "../Icons/BurgerMenu";

export function MobileMenu(): JSX.Element {
    return <div id="wrapper">
        <input type="checkbox" id="menu" name="menu" className="menu-checkbox"/>
        <div className="menu">
            <label className="menu-toggle" htmlFor="menu"><BurgerMenu/></label>
            <h1 className={"menu-title"}>Seiten</h1>
            <ul>
                <li>
                    <a href={"/generate"}>Rezeptgenerator</a>
                </li>
                <li>
                    <a href={"/overview"}>Alle Rezepte</a>
                </li>
                <li>
                    <a href={"/create"}>Rezept anlegen</a>
                </li>
            </ul>
        </div>
    </div>;
}
