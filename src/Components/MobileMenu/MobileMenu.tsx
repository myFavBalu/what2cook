import s from "./MobileMenu.module.scss"
import {BurgerMenu} from "../Icons/BurgerMenu";

export function MobileMenu(): JSX.Element {
    return <div id={s["wrapper"]}>
        <input type="checkbox" id="menu" name="menu" className={s.MenuCheckbox}/>
        <div className={s.Menu}>
            <label className={s.MenuToggle} htmlFor="menu"><BurgerMenu/></label>
            <h1 className={s.MenuTitle}>Seiten</h1>
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
