import { useState } from 'react'
import Game from "./components/Game"
import "./App.css"

function App() {
    return(
        <div className="app">
            <h1>Blackjack</h1>
        <Game />
        </div>
    )
}

export default App
