import Ship from '../ship'



test('create ship with a length of 5', () => {
    expect(Ship(1, 5).length).toBe(5)
})

test('hit ship 4 times, should be sunk', () => {
    const firstShip = Ship(1, 4)
    firstShip.hit(0)
    firstShip.hit(1)
    firstShip.hit(2)
    firstShip.hit(3)
    expect(firstShip.isSunk).toBeTruthy()
})