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
    const [gameStatus,setGameStatus] = useState(0)
    const [deck, setDeck] = useState(shuffleDeck(createDeck()))
    const [ playerHand , setPlayerHand] = useState([])
    const [status , setStatus ] = useState("Click 'Hit' to start!")
    const [dealerHand, setDealerHand] = useState([])

    const hitPlayer = () =>{
        if (deck.length == 0 || gameStatus!==0)return;
        
        let newDeck = [...deck]
        let newPlayerHand = [...playerHand]
        
        const card = newDeck.shift();
        newPlayerHand.push(card);
        setPlayerHand(newPlayerHand)
        setDeck(newDeck)  

        if (calculateHandValue(newPlayerHand)>21){
            setStatus("You busted! Dealer wins.")
            setGameStatus(1)
        }
    }

    const standPlayer = () =>{
        let newDeck = [...deck]
        let newDealerHand = [...dealerHand];

        while (calculateHandValue(newDealerHand)<17 && newDeck.length>0){
            const card = newDeck[0];
            newDealerHand.push(card)
            newDeck = newDeck.slice(1)
        }
        setDealerHand(newDealerHand)
        setDeck(newDeck)
        
        determineWinner(playerHand,newDealerHand)
    }

    const calculateHandValue = (hand) =>{
        let value = 0 ;
        let aceCount = 0;
        if (hand.length == 0 || hand ==isNaN()
        ) return 0;
        for (let card of hand){
            const rank = card.slice(0,-1); 
            if(["J","K","Q"].includes(rank)) value += 10;
            else if (rank == "A"){
                value += 11;
                aceCount++;
            }
            else value += parseInt(rank);
        }
        while (value>21 && aceCount>0){
            value -= 10  ;
            aceCount--;
        }
        return value;
    }

    const determineWinner =() =>{
        const playerValue = calculateHandValue(playerHand)
        const dealerValue = calculateHandValue(dealerHand)
        if (playerValue>21) setStatus("You busted! Dealer wins.")
        else if (dealerValue>21) setStatus("Dealer busted! You win.")
        else if (playerValue>dealerValue) setStatus("You Win!")
        else if (playerValue<dealerValue) setStatus("Dealer Wins!")
        else setStatus("Draw~!")
    }
    

return (
  <div className="flex flex-col items-center justify-center h-screen gap-6 text-center">
    <h2 className="text-2xl font-bold">{status}</h2>
    <div className="text-lg">Player Hand: {playerHand.join(", ")} , value : {calculateHandValue(playerHand)}</div>
    <div className="text-lg">Dealer Hand: {dealerHand.join(", ")} , value :{calculateHandValue(dealerHand)}</div>

    <div className="flex gap-4 mt-4">
      <button
        className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-900 transition-colors"
        onClick={hitPlayer}
      >
        Hit
      </button>

      <button
        className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 transition-colors"
        onClick={standPlayer}
      >
        Stand
      </button>
    </div>
  </div>
);
}








