const Ship = (id, length, isVertical = false, startCoord) => {
    const hitLocations = Array(length);

    const hit = (position) => {
        hitLocations[position] = 'x'
    }

    const isSunk = () => hitLocations.every( element => element === 'x')

    const takenCells = () => {
        let takenCells = []
        if(isVertical){
            for(let i = 0; i < length; i++){
                takenCells.push(startCoord + i * 10)
            }   
        } else{
            for(let i = 0; i < length; i++){
                takenCells.push(startCoord + i)
            }
        }
        return takenCells
    }
    
    return {
        id, length, isVertical, startCoord, hitLocations, hit, isSunk, takenCells
    }
}

export default Ship