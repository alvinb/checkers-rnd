import React, { useContext, useState }from "react";
import { css } from 'aphrodite/no-important';
import { style } from './style';
import { tileValues, getPosX, getPosY, getIndexX, getIndexY } from './../../util/game';

import { BoardContext, PieceContext } from "./../../provider/app-provider";

const Tile = ({indexX, indexY, isPrimaryColor, value, canMoveTo}) => {
    const { board, setBoard } = useContext(BoardContext);
    const { pieces, setPieces} = useContext(PieceContext);



    const styles = style({isPrimaryColor})
    
    const handleClick = () => {
        var selectedPiece = pieces.find(piece => {
            return piece.isSelected;
        });

        if(canMoveTo){
            // move the piece
            setPieces(previous => {
                return previous.map(piece => {
                    if(piece.isSelected){
                        piece.posX = getPosX(indexX);
                        piece.posY = getPosY(indexY);
                    }
                    return piece;
                })
            });

            //update tile values since the selected piece has moved
            setBoard(previous => {
                return previous.map(tile => {
                    if(tile.indexX === getIndexX(selectedPiece.posX) && tile.indexY === getIndexY(selectedPiece.posY)){
                        tile.value = tileValues.neutral;
                    }else if(tile.indexX === indexX && tile.indexY === indexY){
                        tile.value = selectedPiece.value;
                    }
                    return tile;
                })
            })
        }
    }

    return (
        <div 
            className={`${css(styles.tile, canMoveTo && styles.canMoveTo)} player${value} ${indexX}-${indexY}`}
            onClick={handleClick}
        ></div>
    );
};

export default Tile;
