import GameBoard from '../gameBoard'
import Ship from '../ship'

test('board should contain 100 elements', () => {
    const board = GameBoard('player')
    expect(board.boardInfo.board.length).toBe(100)
    }
)

test('place horizontal ships', () => {
    const board = GameBoard('player')

    const checkHorizontalShip = (ship, startCoord) => {
        board.placeShip(ship, startCoord)
        for (let i = startCoord; i < startCoord + ship.length; i++){
            expect(board.boardInfo.board[i].ship).toBe(ship.id)
        }
    }

    const firstShip = Ship('midway', 3)
    checkHorizontalShip(firstShip, 1)

    const secondShip = Ship('pearl', 5)
    checkHorizontalShip(secondShip, 69)

    }
)

test('place vertical ships', () => {
    const board = GameBoard('player')

    const checkVerticalSip = (ship, startCoord) => {
        board.placeShip(ship, startCoord)
        for (let i = startCoord; i < startCoord + ship.length * 10; i += 10){
            expect(board.boardInfo.board[i].ship).toBe(ship.id)
        }
    }

    const firstShip = Ship('midway', 5, true)
    checkVerticalSip(firstShip, 1)

    const secondShip = Ship('pearl', 5, true)
    checkVerticalSip(secondShip, 42)
    }
)

test('board should report there are still ships ', () => {
    const board = GameBoard('player')
    const ship1 = Ship('marco', 4, true)
    board.placeShip(ship1, 50)
    board.receiveHit(99)
    board.receiveHit(50)

    expect(board.boardInfo.shipsLeft).toBeTruthy()

})

test('board should report there are NO ships left', () => {
    const board = GameBoard('player')

    const ship1 = Ship('titanic', 4)
    // board.placeShip(ship1, 50)
    // board.receiveHit(50)
    // board.receiveHit(51)
    // board.receiveHit(52)
    // board.receiveHit(53)
    const sinkHorizontalShip = (ship, startCoord) => {
        board.placeShip(ship, startCoord)
        for(let i = startCoord; i < startCoord + ship.length; i++){
            board.receiveHit(i)
        }
    }
    sinkHorizontalShip(ship1, 50)

    const ship2 = Ship('newWorld', 2, true)
    const sinkVerticalShip = (ship, startCoord) => {
        board.placeShip(ship, startCoord)
        for(let i = startCoord; i < startCoord + ship.length * 10; i += 10){
            board.receiveHit(i)
        }
    }
    sinkVerticalShip(ship2, 3)

    expect(board.boardInfo.shipsLeft).toBeFalsy()

})