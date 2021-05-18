import './App.css';
import {AiFillGithub} from 'react-icons/ai';
import {useState} from 'react';
import WinnerBanner from './components/WinnerBanner';
import GameControl from './components/GameControl';

function App() {
  const [winner, setWinner] = useState(null)
  const [isGameOver, setIsGameOver] = useState(false)

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
