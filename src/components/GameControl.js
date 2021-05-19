import './GameControl.css'
import React, {useEffect, useState} from 'react'
import GameBoard from '../factories/gameBoard'
import Ship from '../factories/ship'
import {BsSquare} from 'react-icons/bs'

const GameControl = () => {
    const [isGame, setIsGame] = useState(false)
    const [playerBoard, setPlayerBoard] = useState(() => GameBoard('player'));
    const [aiBoard, setAiBoard] = useState(() => GameBoard('ai'));
    const [playerShipsArray, setPlayerShipsArray] = useState([]);

    const isVertical = () => {
        if(Math.random() > 0.5){
            return true
        } 
        return false
    }

    function startGame(){
        setIsGame(!isGame)
        //setting up game
        generateShips('player')
        //setting up game
    }
    placeShipsOnBoard(playerShipsArray, playerBoard)



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
        } else{
            console.log('set ships for computer board')
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
                                    onClick = {() =>aiBoard.receiveHit(i)}></div>
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
                <p>Sink all the enemy ships to win!</p>
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
