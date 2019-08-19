import { tileValues } from './game';
import { getPossibleMoves } from './pieces';

export const setCanMoveTo = (piece, tilesState, setTilesState) => {

    const  moves = getPossibleMoves(piece, tilesState);
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

export const setTileValue = (payload, tiles, setTiles) => {
    const {id, value} = payload;

    setTiles(tiles.map(tile => {
        if(id === tile.id){
            tile.value = value
        }
        return tile;
    }))
}

export const setTileValueAt = (payload, tiles, setTiles) => {
    const {x, y, value} = payload;
    setTiles(tiles.map(tile => {
        if(x === tile.indexX && y === tile.indexY){
            tile.value = value
        }
        return tile;
    }))
}


const isOccupied = (tile) => {
    return (tile.value === tileValues.player1 || tile.value === tileValues.player2)

}



/**
 * distance - distance relative to the piece
 * vector - direction vector relative to the piece
 * piece - piece we are checking for
 * tiles - all valid tiles
 */
export const getTileAtDistance = (distance, vector, piece, tiles) => {
    //get the coordinates of tile were looking for
    const x = distance*vector.x + piece.x;
    const y = distance*vector.y + piece.y;
    
    const found = tiles.find(tile => {
        return (x === tile.indexX && y === tile.indexY)
    });

    return found? found: null;
}



export const getValidTiles = (tiles) => {
    const validTiles = tiles.filter(tile => {
      return tile.value !== tileValues.notUsed;
    });

    return validTiles;
}

export const tileContainsEnemy = (pieceValue, tileValue) => {
    if (
        (pieceValue === tileValues.player1 && tileValue === tileValues.player2) ||
        (pieceValue === tileValues.player2 && tileValue === tileValues.player1)
    ) {
        return true;
    }
    return false;
};


const getTileAt = (x, y, tiles) => {
    return tiles.find(tile => {
        return tile.indexX === x && tile.indexY === y;
    });
}