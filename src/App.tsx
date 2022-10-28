import React from 'react';
import './App.scss';
import {Navigation} from "./Components/Navigation";
import {Generator} from "./Components/Generator";

function App() {
    return (
        <div className="App">
            <div className={"Content"}>
                <Navigation/>
                <Generator/>
            </div>
        </div>
    );
}

export default App;
