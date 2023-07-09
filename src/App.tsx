import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Generator} from "./Components/Generator";
import {BasePage} from "./BasePage";
import {AddRecipe} from "./Components/AddRecipe";

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<BasePage><Generator/></BasePage>}/>
                <Route path={"/generate"} element={<BasePage><Generator/></BasePage>}/>
                <Route path={"/create"} element={<BasePage><AddRecipe/></BasePage>}/>
            </Routes>
        </Router>

    );
}

export default App;
