import './App.css';
import {AiFillGithub} from 'react-icons/ai';

function App() {

  return (
    <>
    <div className = "header">
      <h1>Battleship</h1>
      <a target = '_blank' rel = "noreferrer" href = "https://github.com/minho-sama/Battleship"><AiFillGithub id = "git-icon" size = "40px"/></a>
    </div>
    </>
  );
}

export default App;
