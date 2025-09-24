import {useState} from "react";

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

const createDeck = () =>{
    const deck =[]
    for(let suit of suits){
        for(let rank of ranks){
            deck.push(`${rank}${suit}`)
        }
    }
    return deck
}

//some shuffling algo 
const shuffleDeck = (array) => {
    const deck = [...array];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // swap
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}


export default function Game(){

    const [deck, setDeck] = useState(shuffleDeck(createDeck()))
    const [ playerHand , setPlayerHand] = useState([])
    const [status , setStatus ] = useState("Click 'Hit' to start!")

    const hitPlayer = () =>{
        const card = deck[0] 
        setPlayerHand([...playerHand, card])
        setDeck(deck.slice(1))  
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 text-center">
      <h2 className="text-2xl font-bold">{status}</h2>
      <div className="text-lg">Player Hand: {playerHand.join(", ")}</div>
      <button
        className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-900 transition-colors"
        onClick={hitPlayer}
      >Hit
      </button>
      </div>
  );
}








