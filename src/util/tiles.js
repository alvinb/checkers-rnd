import { tileSize, offsetX, offsetY,  pieceSize, tileValues, direction } from './game';

export const setCanMoveTo = (piece, tilesState, setTilesState) => {
    const p = {...piece};

    const validTiles = getValidTiles(tilesState);
    const  moves = getValidMoves(validTiles, p);
    setTilesState(previous => {
        const newTiles = [...previous];
        
        newTiles.forEach(tile => {
            moves.forEach(validTile =>{
                if(tile.indexX === validTile.indexX && tile.indexY === validTile.indexY){
                    tile.canMoveTo = true;
                }
            })
        });

        return newTiles;

    });
}
export const resetTileState = (tiles, setTiles) => {
    setTiles(tiles.map(tile => {
        tile.canMoveTo = false;
        return tile;
    }));
}

const getValidMoves = (validTiles, piece) => {
    const result = [];
    const tilesAtOffset1 = getTilesWithOffset(
        validTiles,
        piece,
        1
    );
    const tilesAtOffset2 = getTilesWithOffset(
        validTiles,
        piece,
        2
    );
    console.log("tilesAtOffset1", tilesAtOffset1);
    console.log("tilesAtOffset2", tilesAtOffset2);
    tilesAtOffset1.forEach(tile => {
        console.log("tile with offeset 1", tile);
        if (!isOccupied(tile)) {
            result.push(tile);
        }

        if (tileContainsEnemy(piece.value, tile.value)) {
            let destinationTile = canEatAtTile(tile, tilesAtOffset2);

            if (destinationTile) {
                // updateTargetArr(piece, getPieceAt(tile.indexX, tile.indexY));
                result.push(destinationTile);
            }
        }
    });

    return result;

}

const isOccupied = (tile) => {
    return (tile.value === tileValues.player1 || tile.value === tileValues.player2)

}

const getTilesWithOffset = (tiles, piece, offset) => {
    const px = piece.x;
    const py = piece.y;
    return tiles.filter(tile => {

        if(piece.isKing){
            return (
                tile.indexX === px - offset ||
                tile.indexX === px + offset ||
                tile.indexY === py - offset ||
                tile.indexY === py + offset
            );
        }
        else if(piece.value === tileValues.player1){
            return (
                ( tile.indexX === px-offset && tile.indexY === py+offset) ||
                ( tile.indexX === px+offset && tile.indexY === py+offset )
            )
        }
        else if(piece.value === tileValues.player2){
            return (
                ( tile.indexX === px-offset && tile.indexY === py-offset) ||
                ( tile.indexX === px+offset && tile.indexY === py-offset )
            )
        }
    })
}
const getValidTiles = (tiles) => {
    const validTiles = tiles.filter(tile => {
      return tile.value === tileValues.neutral;
    });

    return validTiles;
}

const tileContainsEnemy = (pieceValue, tileValue) => {
    if (
        (pieceValue === tileValues.player1 && tileValue === tileValues.player2) ||
        (pieceValue === tileValues.player2 && tileValue === tileValues.player1)
    ) {
        return true;
    }
    return false;
};


const canEatAtTile = (hoveredPiece, tile, tilesAtOffset2) => {
    const px = hoveredPiece.x;
    const py = hoveredPiece.y;
    let d = null;
    if(px > tile.indexX){
        if(py > tile.indexY){
            // setEatDirection(direction.topLeft);
            d = direction.topLeft;
        }else{
            // setEatDirection(direction.bottomLeft);
            d = direction.bottomLeft;
        }
    }else{
        if(py < tile.indexY){
            // setEatDirection(direction.bottomRight);
            d = direction.bottomRight;
        }else{
            // setEatDirection(direction.topRight);
            d = direction.topRight;
        }
    }
    // console.log('eatDirection', eatDirection);
    let destination = null;
    switch(d){
        case direction.topRight:
            destination = getTileAt(tile.indexX+1, tile.indexY-1, tilesAtOffset2);
            break;
        case direction.bottomRight:
            destination = getTileAt(tile.indexX+1, tile.indexY+1, tilesAtOffset2);
            break;
        case direction.bottomLeft:
            destination = getTileAt(tile.indexX-1, tile.indexY+1, tilesAtOffset2);
            break;
        case direction.topLeft:
            destination = getTileAt(tile.indexX-1, tile.indexY-1, tilesAtOffset2);
            break;
        default:
            // do nothing

    }
    return destination && !isOccupied(destination)? destination : null;


}

const getTileAt = (x, y, tiles) => {
    return tiles.find(tile => {
        return tile.indexX === x && tile.indexY === y;
    });
}