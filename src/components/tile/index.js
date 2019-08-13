import React, { useContext, useState, useEffect }from "react";
import { css } from 'aphrodite/no-important';
import { style } from './style';
import { tileValues, getPosX, getPosY, getIndexX, getIndexY, direction } from './../../util/game';

import { BoardContext, PieceContext, AppContext } from "./../../provider/app-provider";

const Tile = ({indexX, indexY, isPrimaryColor, value, canMoveTo}) => {
    const { board, setBoard } = useContext(BoardContext);
    const { pieces, setPieces} = useContext(PieceContext);
    const { app, setApp } = useContext(AppContext);

    const [direction, setDirection] = useState('');


    useEffect(() => {

    }, [board])

    const getTargetCoordinates = (selectedPiece) => {

        const targetX = (indexX - getIndexX(selectedPiece.posX))/2;
        const targetY = (indexY - getIndexY(selectedPiece.posY))/2;
        if(Math.abs(targetX) < 1 || Math.abs(targetY) < 1) return null;

        return {
            x: targetX,
            y: targetY
        }
        

    }
    const styles = style({isPrimaryColor})
    
    const handleClick = () => {
        var selectedPiece = pieces.find(piece => {
            return piece.isSelected;
        });
        if(canMoveTo){
            // move the piece
            const coordinates = getTargetCoordinates(selectedPiece);
            const hasEaten = !!coordinates;

            setPieces(previous => {
                const newPieces = [...previous];

                newPieces.forEach(piece => {
                    if (piece.isSelected) {
                      piece.posX = getPosX(indexX);
                      piece.posY = getPosY(indexY);
                      piece.x = indexX;
                      piece.y = indexY;
                      piece.isSelected = false;
                    }
                });
                // remove piece that was eaten
                if(hasEaten){
                    const index = newPieces.findIndex(piece => {

                        // console.log(`(px,py) = (${piece.x}, ${piece.y})`);
                        // console.log(`(sx,sy) = (${selectedPiece.x}, ${selectedPiece.y})`);

                        return (piece.x === (selectedPiece.x - coordinates.x) && piece.y === (selectedPiece.y - coordinates.y ))
                    });
                    newPieces.splice(index, 1);
                }

                return newPieces;
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

            setApp(previous => {
                const newAppState = {...previous};
                const last = newAppState.playersTurn;
                newAppState.playersTurn = last === tileValues.player1? tileValues.player2 : tileValues.player1;
                
                return newAppState;

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
