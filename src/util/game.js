import { getPiecesThatCanMove } from "./pieces";


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

export const gameState = {
    setup: 0,
    started: 1,
    player1Wins: 3,
    player2Wins: 4,
    draw: 5

};

export const messages = {
    player1Wins: 'Game Over: Player 1 wins',
    player2Wins: 'Game Over: Player 2 wins',
    draw: 'Game Over: draw',
    player1sTurn: 'Player 1\'s turn',
    player2sTurn: 'Player 2\'s turn',
    loading: 'Setting up game...'
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

export const setLastMove = (piece, gameState, setGameState) => {
    setGameState({
      ...gameState,
      lastMove: piece
    });
}

export const setGameStatus = (payload, gameState, setGameState) => {
    const { gameStatus, playersTurn } = payload;

    setGameState({
      ...gameState,
      playersTurn: playersTurn,
      gameStatus: gameStatus
    });
}

export const getGameStatus = (game, pieces) => {
    const { gameStatus } = game;
    const player1Pieces = pieces.filter(piece => {
        return piece.value === tileValues.player1
    });
    const player2Pieces = pieces.filter(piece => {
      return piece.value === tileValues.player1;
    });
    const piecesThatCanMove = getPiecesThatCanMove(pieces, game.playersTurn);

    switch (gameStatus) {
      case gameState.started:
        //if there are no more p1 pieces
        if (player1Pieces.length === 0) {
          return gameState.player2Wins;

          //if there are no more p2 pieces
        } else if (player2Pieces.length === 0) {
          return gameState.player1Wins;

          // if p1 or p2 cant move any of their pieces
        } else if (piecesThatCanMove.length === 0) {
          return game.playersTurn === tileValues.player1
            ? gameState.player2Wins
            : gameState.player1Wins;
        }else{
            return gameState.started;
        }
    
      case gameState.setup:
      case gameState.draw:
      default:
        return gameState.started;
    }
}

export const shuffle = (collection) => {
    let j, x, i;
    for (i = collection.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = collection[i];
      collection[i] = collection[j];
      collection[j] = x;
    }
    return collection;
}