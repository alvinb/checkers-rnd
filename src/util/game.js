export const tileValues = {
    notUsed: -1,
    neutral: 0,
    player1: 1,
    player2: 2
}

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
