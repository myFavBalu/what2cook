import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Generator} from "./Components/Generator";
import {BasePage} from "./BasePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<BasePage><Generator/></BasePage>}/>
                <Route path={"/generate"} element={<BasePage><Generator/></BasePage>}/>
                <Route path={"/create"} element={<BasePage><div>WIP</div></BasePage>}/>
            </Routes>
        </Router>

    );
}

export default App;
