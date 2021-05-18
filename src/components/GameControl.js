import './GameControl.css'
import React, {useEffect, useState} from 'react'
import GameBoard from '../factories/gameBoard'

const GameControl = () => {
    const [playerBoard, setPlayerBoard] = useState({})
    const [aiBoard, setAiBoard] = useState({})
    
    
    
    useEffect(() => {
        //creating the boards
        const playerBoard = GameBoard('player');
        setPlayerBoard({...playerBoard});
        const aiBoard = GameBoard('ai');
        setAiBoard({...aiBoard});

        //creating ships
        for(let i = 1; i < 6; i++){

        }
    },[])
    console.log(playerBoard)

    // const takenPlayerBoardCells = playerBoard.filter((cell) => cell.ship )
    // const takenAiBoardCells = playerBoard.filter((cell) => cell.ship )

    // window.addEventListener('click', () => {
    //     aiBoard.receiveHit(10)
    // })

    // console.log(takenPlayerBoardCells)


    function decideCellColorAi (cell) {
        if(cell.beenHit && cell.ship){
            return 'red'
        }
        else if(cell.beenHit && !cell.ship){
            return 'blue'
        }
    }

    function decideCellColorPlayer (cell) {
        if(cell.ship){
            return 'white'
        }
        else if(cell.beenHit && cell.ship){
            return 'red'
        }
        else if(cell.beenHit && !cell.ship){
            return 'blue'
        }
    }   

        return (
            <div className = 'board-container'>
                <div className = "board player-board">
                {
                    playerBoard.boardInfo.board.map((cell, i) => {
                        return (
                            <div className = {`cell player-cell ${decideCellColorPlayer(cell)}`}  key = {i}></div>
                        )
                    } )
                }
                </div>
                <div className = "board ai-board">
                {
                    aiBoard.boardInfo.board.map((cell, i) => {
                        return (
                            <div className = {`cell player-cell ${decideCellColorAi(cell)}`}  key = {i} ></div>
                        )
                    } )
                }
                </div>
            </div>
        )
}

export default GameControl
