import s from './App.module.scss';
import {Navigation} from "./Components/NavBar/Navigation";
import React from "react";
import {MobileMenu} from "./Components/MobileMenu/MobileMenu";


type PropType = {
    children: JSX.Element
}

export function BasePage(props: PropType) {
    return <>
        <MobileMenu/>
        <div className={s.App}>
            <Navigation/>
            {props.children}
        </div>
    </>
}