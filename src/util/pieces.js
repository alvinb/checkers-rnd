import React, { useState, useContext, useEffect } from "react";

import { AppContext } from './../provider/app-provider';


import { tileSize, offsetX, offsetY,  pieceSize, tileValues } from './game';
import { getValidTiles, getTileAtDistance, tileContainsEnemy } from './tiles';

export const setCoordinates = (payload, piecesState, setPiecesState) => {
    const { id, x, y } = payload;

    setPiecesState(piecesState.map(piece => {
        if(piece.id === id){
            piece.x = x;
            piece.y = y;
        }
        return piece;
    }))
}

export const setPosition = (payload, piecesState, setPiecesState) => {
    const { id, x, y } = payload;

    const { posX, posY } = getPosition(x,y);

    setPiecesState(piecesState.map(piece => {
        if(piece.id === id){
            piece.posX = posX;
            piece.posY = posY;
        }
        return piece;
    }))
}

export const selectPiece = (id, piecesState, setPiecesState) => {

    setPiecesState(piecesState.map(piece => {
        if(piece.id === id){
            piece.isSelected = true;
        }
        return piece;
    }))
}

export const unSelectPiece = (id, piecesState, setPiecesState) => {

    setPiecesState(piecesState.map(piece => {
        if(piece.id === id){
            piece.isSelected = false;
        }
        return piece;
    }))
}

export const getSelected = (pieces) => {
    return pieces.find(piece => {
        return piece.isSelected
    });
}


export const setValue = (payload, piecesState, setPiecesState) => {
    const { id, value} = payload;

    setPiecesState(piecesState.map(piece => {
        if(piece.id === id){
            piece.value = value
        };
        return piece;
    }));

};

export const setKing = (id, piecesState, setPiecesState) => {

    setPiecesState(piecesState.map(piece => {
        if(piece.id === id){
            piece.isKing = true
        };
        return piece;
    }));

};

export const getHoveredPiece = (id, piecesState ) => {
    return piecesState.find(piece => {
        return id === piece.id;
    });
}

export const movePieceTo = (data, pieces, setPieces) => {
    const {x, y, id} = data;
    const {posX, posY} = getPosition(x, y);

    setPieces(pieces.map(piece => {
        if(piece.id === id){
            piece.x = x;
            piece.y = y;
            piece.posX = posX;
            piece.posY = posY;
            piece.prevX = x;
            piece.prevY = y;
        }
        return piece;
    }))
}
export const getPieceAt = (coord, pieces, setPieces) => {
    const {x, y} = coord;

    return pieces.find(piece => {
        return (piece.x === x && piece.y ===y)
    });
}

export const removePiece = (id, pieces, setPieces) => {
    const arr = [...pieces];

    const i = arr.findIndex(piece => {
        return piece.id === id;
    });

    arr.splice(i, 1);

    setPieces(arr);
    
}

export const getPossibleMoves = (piece, tiles) => {
    const validTiles = getValidTiles(tiles);
    const moveVectors = getMoveVectors(piece);
    const result1 = [];
    const result2 = [];
    moveVectors.forEach((vector => {
        const tileAtDistance1 = getTileAtDistance(1, vector, piece, validTiles);

        // console.log('vector', vector);
        // console.log("tileAtDistance1", tileAtDistance1);

        if (!tileAtDistance1){
            return;
        }
        if (tileAtDistance1.value === tileValues.neutral) {
            result1.push(tileAtDistance1);
            return;
        }
        if (tileContainsEnemy(piece.value, tileAtDistance1.value)){

            const tileAtDistance2 = getTileAtDistance(2, vector, piece, validTiles);
            console.log('tileAtDistance2', tileAtDistance2)
            if(tileAtDistance2 && tileAtDistance2.value === tileValues.neutral){
                result2.push(tileAtDistance2);
            }
        }

    }));

    if(result2.length > 0){
        return result2;
    }

    return result1;
}

// update pieces that can eat
export const setPiecesThatCanEat = (pieces, setPieces, tiles) => {
    setPieces(pieces.map(piece => {
        if(canPieceEat(piece, tiles)){
            piece.canEat = true;
        }else{
            piece.canEat = false;
        }

        return piece;
        
    }))

}

export const setPieceStates = (pieces, setPieces, options) => {
    const {tiles, player} = options;

    const playerPiecesThatCanEat = pieces.filter(piece => {
        return piece.value === player && canPieceEat(piece, tiles);
    });

    setPieces(pieces.map(piece => {
        const possibleMoves = getPossibleMoves(piece, tiles);
        
        if(playerPiecesThatCanEat.length > 0){
            const found = playerPiecesThatCanEat.find(p => {
                return p.id === piece.id;
            });

            if(found){
                piece.canEat = true;
                piece.canMove = true;
            }else{
                piece.canEat = false;
                piece.canMove = false;
            }

        }else if(possibleMoves.length > 0){
            piece.canEat = false;
            piece.canMove = piece.value === player;
        }else{
            piece.canEat = false;
            piece.canMove = false;
        }

        piece.isSelected = false;
        piece.isKing = isKing(piece);

        return piece;
    }))

}

export const getPiecesThatCanMove = (pieces, player) => {
    return pieces.filter(piece => {
        return piece.canMove && piece.value === player
    });
}

export const isKing = (piece) => {
    if(piece.isKing) return true;

    if(piece.value === tileValues.player1){
        return piece.y === 7;
    }else{
        return piece.y === 0;
    }
}

export const canPieceEat = (piece, tiles) => {
    const moveVectors = getMoveVectors(piece);
    const validTiles = getValidTiles(tiles);
    let result = false;
    moveVectors.forEach(vector => {
        const tileAtDistance1 = getTileAtDistance(1, vector, piece, validTiles);

        if (tileAtDistance1 && tileContainsEnemy(piece.value, tileAtDistance1.value)){

            const tileAtDistance2 = getTileAtDistance(2, vector, piece, validTiles);

            if(tileAtDistance2 && tileAtDistance2.value === tileValues.neutral){
                result = true;
            }
        }
    })

    return result;

}


const getPosition = (x,y) => {
    return {
        posX: x * tileSize + offsetX,
        posY: y * tileSize + offsetY
    }; 
}

// get all the possible move vectors that a piece can make
const getMoveVectors = (piece) => {
    const moveVectors = [];
    if(piece.isKing){
        moveVectors.push({ x: 1, y: -1 }); // top right
        moveVectors.push({ x: -1, y: -1 }); // top left
        moveVectors.push({ x: 1, y: 1 }); // bottom right
        moveVectors.push({ x: -1, y: 1 }); // bottom left

    }else if(piece.value === tileValues.player1){
        moveVectors.push({ x: 1, y: 1 }); // bottom right
        moveVectors.push({ x: -1, y: 1 }); // bottom left
    }else{
        moveVectors.push({ x: 1, y: -1 }); // top right
        moveVectors.push({ x: -1, y: -1 }); // top left
    }
    return moveVectors;

}

export const getMoveVector = (piece, move) => {
    const x1 = piece.x;
    const y1 = piece.y;
    const x2 = move.indexX;
    const y2 = move.indexY;

    return {
        x: x2 > x1? 1: -1,
        y: y2 > y1? 1: -1
    }
}