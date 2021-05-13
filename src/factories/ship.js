const Ship = (id, length, isVertical = false) => {
    const hitLocations = Array(length);
    const hit = (position) => {
        hitLocations[position] = 'x'
    }
    const isSunk = () => hitLocations.every( element => element === 'x')
    return {
        id, length, isVertical, hitLocations, hit, isSunk
    }
}

export default Ship