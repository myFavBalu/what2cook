import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Generator} from "./Components/Pages/Generator/Generator";
import {BasePage} from "./BasePage";
import {AddRecipe} from "./Components/Pages/AddRecipe/AddRecipe";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Overview} from "./Components/Pages/Overview/Overview";

function App() {
    return <>
        <ToastContainer autoClose={1500}/>
        <Router>
            <Routes>
                <Route index element={<BasePage><Generator/></BasePage>}/>
                <Route path={"/generate"} element={<BasePage><Generator/></BasePage>}/>
                <Route path={"/overview"} element={<BasePage><Overview /></BasePage>}/>
                <Route path={"/create"} element={<BasePage><AddRecipe/></BasePage>}/>
            </Routes>
        </Router>
    </>;
}

export default App;
