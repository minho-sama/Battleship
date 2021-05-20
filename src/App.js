import './App.css';
import {AiFillGithub} from 'react-icons/ai';
import GameControl from './components/GameControl';

function App() {

  return (
    <>
    <div className = "header">
      <h1>Battleship</h1>
      <a target = '_blank' rel = "noreferrer" href = "https://github.com/minho-sama/Battleship"><AiFillGithub id = "git-icon" size = "40px"/></a>
    </div>

    <GameControl/>

    </>
  );
}

export default App;
