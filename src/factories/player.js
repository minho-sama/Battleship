//csinálni egy ai-t ami figyelembe veszi h vertical v horizontal
//csinálni legyőzhetetlen ai-t is

const Player = (name) => {

    const playerInfo = {
        name,
        shots: []
    };

    const getRandMove = () => {
        let randMove = getRandomNum(100)
        while(playerInfo.shots.includes(randMove)){
            randMove = getRandomNum(100)
        }
        playerInfo.shots.push(randMove)
        return randMove;
    }

    const getRandomNum = (num) => {
        return Math.floor(Math.random() * num)
    }

    const resetShots = () => {
        playerInfo.shots.length = 0;
    }

    const AI = (lastShot) => {
        if (lastShot.hit){
            const figureNextMove = (lastShot) => {
                let randomNum = getRandomNum(4);
                let nextMove;
                // eslint-disable-next-line default-case
                switch(randomNum) {
                    case 0: 
                        nextMove = lastShot.location + 1;
                        break;
                    case 1: 
                        nextMove = lastShot.location -1;
                        break;
                    case 2: 
                        nextMove = lastShot.location + 10;
                        break;
                    case 3: 
                        nextMove = lastShot.location - 10;
                        break;
                }
                return nextMove
            };

            let nextMove = figureNextMove(lastShot);
            let timeOut = 0;
            let whileTrue = true;

            while (playerInfo.shots.includes(nextMove) || nextMove > 99 || nextMove < 0){
                nextMove = figureNextMove(lastShot);
                timeOut++;
                if (timeOut === 40){
                    whileTrue = false
                    break;
                }
            };
            timeOut = 0;
            if (!whileTrue) {
                return getRandMove();
            } else {
                playerInfo.shots.push(nextMove);
                return nextMove;
                } 

        } else {
            return getRandMove()
        }

    };

    return {
        playerInfo,
        AI,
        resetShots,
    }
}

export default Player