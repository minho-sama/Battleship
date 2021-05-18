import './GameControl.css'
import React, {useEffect, useState} from 'react'
import GameBoard from '../factories/gameBoard'
import Ship from '../factories/ship'

const GameControl = () => {
    const [playerBoard, setPlayerBoard] = useState(() => GameBoard('player'));
    const [aiBoard, setAiBoard] = useState(() => GameBoard('ai'));
    const [playerShipsArray, setPlayerShipsArray] = useState([]);

    const isVertical = () => {
        if(Math.random() > 0.5){
            return true
        } 
        return false
    }

    //setting up game
    useEffect(() => {
        generateShips(playerBoard)
    }, [])

    useEffect(() => {
        console.log(checkTakenCells(playerShipsArray))

            // while(!checkTakenCells(playerShipsArray)){
            //     generateShips(playerBoard)
            // }

    }, [playerShipsArray])

    placeShipsOnBoard(playerShipsArray, playerBoard)
    //setting up game

    function generateShips() {
        let shipsArr = [];
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
                if(!ship.isVertical && ship.startCoord + ship.length > Math.ceil((ship.startCoord+1)/10)*10){
                    while(ship.startCoord + ship.length > Math.ceil((ship.startCoord+1)/10)*10){
                        ship.startCoord = Math.floor(Math.random() * 100);
                    }
                }

                // console.log(ship.isVertical + ' ship ' + ship.id + ' was placed startcoord: ' + ship.startCoord)
                shipsArr.push(ship)
            }
        }
        setPlayerShipsArray(shipsArr)
    }

    function checkTakenCells (array){
        let takenCells = [];
        array.forEach(ship => takenCells.push(...ship.takenCells()))
        console.log(takenCells)
        //if 2 ships share the same coordinate, the takenCells array will have the shared coordinate twice
            return new Set(takenCells).size === takenCells.length
    }
    

    function placeShipsOnBoard(array, board){
        for (let i = 0; i < array.length; i++){
            board.placeShip(array[i], array[i].startCoord) 
        }
    }

    


    //recordolni a foglalt cellákat (filter, includes) + ÁTFOLYIK a kövi sorba a horizontal!!!!
    //ezt functionbe rakni: takenCells(board)
    // const takenPlayerBoardCells = playerBoard.filter((cell) => cell.ship )
    // const takenAiBoardCells = playerBoard.filter((cell) => cell.ship )

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


        return (
            <>
            <div className = 'board-container'>
                <div className = "board player-board">
                {
                    playerBoard.boardInfo.board.map((cell, i) => {
                        return (
                            <div className = {`cell player-cell ${decideCellColorPlayer(cell)}`}  key = {i}>{i}</div>
                        )
                    } )
                }
                </div>
                <div className = "board ai-board">
                {
                    aiBoard.boardInfo.board.map((cell, i) => { 
                        return (
                            <div className = {`cell ai-cell ${decideCellColorAi(cell)}`}  key = {i} onClick = {() =>aiBoard.receiveHit(i)}></div>
                        )
                    } )
                }
                </div>
            </div>
            </>
        )
}

export default GameControl
