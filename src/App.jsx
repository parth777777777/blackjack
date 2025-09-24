import { useState } from 'react'
import Game from "./components/Game"
import "./index.css"
function App() {
  return(
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Blackjack</h1>
      <Game />
    </div>
  )
}
export default App
