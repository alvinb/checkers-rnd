export const tileValues = {
    notUsed: -1,
    neutral: 0,
    player1: 1,
    player2: 2
}
export const direction = {
    topRight: 'top-right',
    bottomRight: 'bottom-right',
    bottomLeft: 'bottom-left',
    topLeft: 'top-left'
};

export const boardSize = 8;

export const tileSize = 80;
export const pieceSize = 60;
export const offsetX = 10;
export const offsetY = 10;

export const getPosX = (x) => {
    return x*tileSize + offsetX;
};

export const getPosY = (y) => {
    return y*tileSize + offsetY;
};

export const getIndexX = (posX) => {
    return (posX - offsetX)/tileSize;
}
export const getIndexY = (posY) => {
    return (posY - offsetY) / tileSize;
}


export const isInBoundsWithDistance = (x, y, offset) => {

    if(x < 0 || x > boardSize-1){
        return false;
    }
    if (y < 0 || y > boardSize - 1) {
      return false;
    }

    return true;
}

export const tileContainsEnemy = (pieceValue, tileValue) => {
    if(
        (pieceValue === tileValues.player1 && tileValue === tileValues.player2) || 
        (pieceValue === tileValues.player2 && tileValue === tileValues.player1)) {

        return true;
    }
    return false;

}

export const isOccupied = (tile) => {
    return (tile.value === tileValues.player1 || tile.value === tileValues.player2)
}

export const isOccupiedAt = (x, y, tiles) => {
    const tile = tiles.find(tile => {
        return (tile.indexX === x && tile.indexY === y)
    });
    return (tile.value === tileValues.player1 || tile.value === tileValues.player2)

}