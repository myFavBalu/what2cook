import './App.scss';
import {Navigation} from "./Components/NavBar/Navigation";
import React from "react";
import {MobileMenu} from "./Components/MobileMenu/MobileMenu";


type PropType = {
    children: JSX.Element
}

export function BasePage(props: PropType) {
    return <>
        <MobileMenu/>
        <div className={"App"}>
            <Navigation/>
            {props.children}
        </div>
    </>
}