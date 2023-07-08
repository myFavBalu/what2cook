import './App.scss';
import {Navigation} from "./Components/Navigation";
import React from "react";


type PropType = {
    children: JSX.Element
}

export function BasePage(props: PropType) {
    return <div className={"App"}>
        <Navigation/>
        {props.children}
    </div>
}