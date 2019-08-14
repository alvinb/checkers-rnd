import { tileSize, offsetX, offsetY,  pieceSize, tileValues } from './game';

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

// helper functions
const getPosition = (x,y) => {
    return {
        posX: x * tileSize + offsetX,
        posY: y * tileSize + offsetY
    }; 
}