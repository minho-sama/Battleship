import './App.css';
import {AiFillGithub} from 'react-icons/ai';
import {useState} from 'react';
import WinnerBanner from './components/WinnerBanner';
import GameControl from './components/GameControl';

// import GameBoard from './factories/gameBoard'
// import Player from './factories/player'
// import Ship from './factories/ship'

function App() {
  const [winner, setWinner] = useState(null)
  const [isGameOver, setIsGameOver] = useState(false)

  // const board = GameBoard('computer')
  // const titanic = Ship('titanic', 3, true)
  // const ship2 = Ship('ship2', 1)
  // const ship3 = Ship('ship3', 4, true)
  // const ship4 = Ship('ship4', 5)
  // const ship5 = Ship('ship5', 2)
  // board.placeShip(titanic, 2)
  // board.placeShip(ship2, 45)
  // board.placeShip(ship3, 23)
  // board.placeShip(ship4, 11)
  // board.placeShip(ship5, 88)
  // board.receiveHit(11)
  // window.addEventListener('click', () => console.table(board.boardInfo.board))

  return (
    <>
    <div className = "header">
      <h1>Battleship</h1>
      <a target = '_blank' rel = "noreferrer" href = "https://github.com/minho-sama/Battleship"><AiFillGithub id = "git-icon" size = "40px"/></a>
    </div>
    {
      isGameOver && <WinnerBanner winner = {winner} setIsGameOver = {setIsGameOver}/>
    }
    <GameControl/>

    </>
  );
}

export default App;
