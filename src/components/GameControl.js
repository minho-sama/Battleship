import './GameControl.css'
import React, {useState, useEffect} from 'react'
import GameBoard from '../factories/gameBoard'
import Ship from '../factories/ship'
import {BsSquare} from 'react-icons/bs'
import { cloneDeep } from 'lodash';

const GameControl = () => {
    const [isGame, setIsGame] = useState(false)
    const [playerBoard, setPlayerBoard] = useState(() => GameBoard('player'));
    const [aiBoard, setAiBoard] = useState(() => GameBoard('ai'));
    const [playerShipsArray, setPlayerShipsArray] = useState([]);
    const [aiShipsArray, setAiShipsArray] = useState([]);  

    const [isPlayerTurn, setIsPlayerTurn] = useState(true)

    const isVertical = () => {
        if(Math.random() > 0.5){
            return true
        } 
        return false
    }

    function startGame () {
        setIsGame(!isGame)
        setUpGame()
    }

    //for the restart button
    function setUpGame(){
        generateShips('player')
        generateShips('ai')
        //lehet h boardból is újat kell majd csinálni, vagy elég kitörölni a board.boardInfo.boardot?
    }
    placeShipsOnBoard(playerShipsArray, playerBoard)
    placeShipsOnBoard(aiShipsArray, aiBoard)
    console.log(aiBoard.boardInfo.board)



    function generateShips(owner) {
        let shipsArr = [];
        let takenCells = [];

        do{ //if 2 ships share the same coordinate, the takenCells array will have the shared coordinate twice
            shipsArr = [];
            takenCells = [];

            while(shipsArr.length < 5){

                for(let i = 1; i < 6; i++){
                    let startCoord = Math.floor(Math.random() * 100);
                    const ship = Ship(i, i, isVertical(), startCoord)
                    
                    //cheking if ship coordinates are not on board
                    if(ship.isVertical && ship.startCoord + (ship.length - 1) * 10 > 99){
                        while(ship.startCoord + ship.length * 10 > 99){
                            ship.startCoord = Math.floor(Math.random() * 100);
                        }
                    } else{
                        if(ship.startCoord + ship.length > 99){
                            while(ship.startCoord + ship.length > 99){
                                ship.startCoord = Math.floor(Math.random() * 100);
                            }
                        }
                    }
                    //check for overflow to next row 
                    if(true){

                        if(!ship.isVertical && ship.startCoord + ship.length > Math.ceil((ship.startCoord+1)/10)*10){
                            while(ship.startCoord + ship.length > Math.ceil((ship.startCoord+1)/10)*10){
                                ship.startCoord = Math.floor(Math.random() * (100 - ship.length));
                            }
                        }
                        //pushing all the ship coordinates to the array
                        console.log(ship.startCoord)
                        console.log(ship.takenCells(ship.startCoord))
                        takenCells.push(...ship.takenCells(ship.startCoord))
                    }

                    shipsArr.push(ship)
                }
            }
        } while(takenCells.length !== new Set(takenCells).size)
        

        if(owner === 'player') {
            setPlayerShipsArray(shipsArr)
        } else if (owner === 'ai'){
            setAiShipsArray(shipsArr)
        }
    }

    function placeShipsOnBoard(array, board){
        for (let i = 0; i < array.length; i++){
            board.placeShip(array[i], array[i].startCoord)

            console.log(array[i].startCoord)
        }
    }

    function decideCellColorAi (cell) {
        if(cell.beenHit && cell.ship){
            return 'red'
        }
        else if(cell.beenHit && !cell.ship){
            return 'blue'
        }
    }

    function decideCellColorPlayer (cell) {
        if(cell.ship !== false){
            return 'white'
        }
        else if(cell.beenHit && cell.ship){
            return 'red'
        }
        else if(cell.beenHit && !cell.ship){
            return 'blue'
        }
    }  
    function handleAttack(owner, i){
        if(owner === "ai"){
            aiBoard.boardInfo.board[i].beenHit = true //receiveHit[i]
            setAiBoard(cloneDeep(aiBoard))
        } else{
            console.log('hitting player board')
        }
    }

    //validating to not hit the same cell twice, sound on attack, check every round if there's a winner, smart AI moves, gameLoop logic

    if(isGame) {
        return (
            <>
            <div className = 'board-container'>
                <div className = "container">
                    <h1>Your board</h1>
                    <div className = "board player-board">
                    {
                        playerBoard.boardInfo.board.map((cell, i) => {
                            return (
                                <div className = {`cell player-cell ${decideCellColorPlayer(cell)}`}  key = {i}>{i}</div>
                            )
                        } )
                    }
                </div>

                </div>
                <div className = "container">
                    <h1>Enemy's board</h1>
                    <div className = "board ai-board">
                    {
                        aiBoard.boardInfo.board.map((cell, i) => { 
                            return (
                                <div className = {`cell ai-cell ${decideCellColorAi(cell)}`}  key = {i} 
                                    onClick = {() => handleAttack('ai',i)}></div>
                            )
                        } )
                    }
                </div>

                </div>
            </div>
            </>
        )
    }
    else if(!isGame){
        return(
            <div className = "welcome-board">
                <button className = "start" onClick = {() => startGame()}>Start game</button>
                <p>Sink all enemy ships to win!</p>
                <ul>
                    <li id = "white-grid"><BsSquare/> Ship</li>
                    <li id = "blue-grid"><BsSquare/> Water</li>
                    <li id = "red-grid"><BsSquare/> Hit</li>
                </ul>
            </div>
        )
    }
}

export default GameControl
