import React, { useContext, useState, useEffect }from "react";
import { css } from 'aphrodite/no-important';
import { style } from './style';
import { tileValues, getPosX, getPosY, getIndexX, getIndexY, direction, boardSize } from './../../util/game';

import { BoardContext, PieceContext, AppContext } from "./../../provider/app-provider";

const Tile = ({indexX, indexY, isPrimaryColor, value, canMoveTo}) => {
    const { board, setBoard } = useContext(BoardContext);
    const { pieces, setPieces} = useContext(PieceContext);
    const { app, setApp } = useContext(AppContext);
    

    
    const styles = style({isPrimaryColor})

    const getMoveData = (selectedPiece) => {

        const targetX = (indexX - getIndexX(selectedPiece.posX))/2;
        const targetY = (indexY - getIndexY(selectedPiece.posY))/2;
        if(Math.abs(targetX) < 1 || Math.abs(targetY) < 1){
            return {
                hasEaten: false,
                x: 0,
                y: 0
            };
        }

        return {
            hasEaten: true,
            x: targetX,
            y: targetY
        }
        

    }
    
    
    const handleDrop = (event) => {
        if(!canMoveTo) return;

        var selectedPiece = pieces.find(piece => {
          return piece.isSelected;
        });

        const data = getMoveData(selectedPiece);
        const hasEaten = data.hasEaten;

        const srcId = event.dataTransfer.getData('srcId');

        let [x,y] = srcId.split('-')[1].split('');
        x = parseInt(x);
        y = parseInt(y)
        
        setPieces(previous => {
            const newPieces = [...previous];

            newPieces.forEach(piece => {
                if (piece.isSelected) {
                    piece.posX = getPosX(indexX);
                    piece.posY = getPosY(indexY);
                    piece.x = indexX;
                    piece.y = indexY;
                    piece.isSelected = false;

                    if(indexY === boardSize-1){
                        piece.isKing = true;
                    }
                }
            });
            // remove piece that was eaten
            if(hasEaten){

                const index = newPieces.findIndex(piece => {

                    // console.log(`(px,py) = (${piece.x}, ${piece.y})`);
                    // console.log(`(sx,sy) = (${selectedPiece.x}, ${selectedPiece.y})`);

                    return (piece.x === (selectedPiece.x - data.x) && piece.y === (selectedPiece.y - data.y ))
                });
                newPieces.splice(index, 1);
            }

            return newPieces;


        });

        setApp(previous => {
            const newAppState = { ...previous };
            const last = newAppState.playersTurn;
            newAppState.playersTurn = last === tileValues.player1 ? tileValues.player2 : tileValues.player1;

          return newAppState;
        });

        //update tile values since the selected piece has moved
        setBoard(previous => {
            return previous.map(tile => {
                console.log('hasEaten', hasEaten);
                console.log('tile', tile);
                console.log('selectedPiece', selectedPiece);
                console.log('data', data);
                
                if(tile.indexX === (selectedPiece.x - data.x) && tile.indexY === (selectedPiece.y - data.y)){
                    tile.value = tileValues.neutral;
                }else if(tile.indexX === indexX && tile.indexY === indexY){
                    tile.value = selectedPiece.value;
                }
                return tile;
            })
        })

    }
    const handleDragOver = (event) => {
        event.preventDefault();
    }
    return (
        <div 
            className={`${css(styles.tile, canMoveTo && styles.canMoveTo)} player${value} ${indexX}-${indexY}`}
            // onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        ></div>
    );
};

export default Tile;
