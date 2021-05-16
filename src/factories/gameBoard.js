export const GameBoard = (ownerName) => {
    const boardInfo = {
        board: [],
        shipsLeft: true,
        owner: ownerName,
        lastShot: {
            hit:false,
            location:false
        }

    }

    const fillBoard = () => {
        for (let i = 0; i < 100; i++){
            boardInfo.board.push({ship: false, beenHit: false})
        }
    }

    if (boardInfo.board.length === 0){
        fillBoard()
    }

    const allShipsSunk = () => {
        for (let cell of boardInfo.board) {
            // if (cell.ship !== false){
            //     if(cell.beenHit === false){
            //         boardInfo.shipsLeft = true
            //         return
            //     }
            // }

            if(cell.ship !== false && !cell.beenHit){
                boardInfo.shipsLeft = true
                return
            }

        }
        boardInfo.shipsLeft = false
    };

    const receiveHit = (coords) => {
        boardInfo.board[coords].beenHit = true;

        //for AI to decide nextMove
        if(boardInfo.board[coords].ship){
            boardInfo.lastShot.hit = true
            boardInfo.lastShot.location = coords;
        }
        allShipsSunk();
    }

    const placeShip = (ship, startCoord) => {
        if (ship.isVertical){
            for (let i = 0; i < ship.length; i++){
                boardInfo.board[startCoord + i * 10].ship = ship.id 
            }
        }
        else{
            for (let i = 0; i < ship.length; i++) {
                boardInfo.board[startCoord + i].ship = ship.id
            }
        }
    }

    return {boardInfo, receiveHit, placeShip}

}

export default GameBoard