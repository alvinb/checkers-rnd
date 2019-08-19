import React, { useContext, useState, useEffect }from 'react';
import { css } from 'aphrodite/no-important';
import { style } from './style';
import { tileValues } from './../../util/game';

import { BoardContext, PieceContext, AppContext } from './../../provider/app-provider';

// util
import {
  getSelected,
  movePieceTo,
  getPieceAt,
  removePiece,
  canPieceEat
} from "./../../util/pieces";
import { setTileValueAt, resetTileState } from "./../../util/tiles";

import { setLastMove } from './../../util/game';


const Tile = ({indexX, indexY, isPrimaryColor, value, canMoveTo, id}) => {
    const { board, setBoard } = useContext(BoardContext);
    const { pieces, setPieces} = useContext(PieceContext);
    const { app, setApp } = useContext(AppContext);
    const [hasDropped, setHasDropped] = useState(false);

    // const prevCoordinates = usePiecePreviousCoordinate(getSelected(pieces));
    
    useEffect(()=>{
        resetTileState(board, setBoard);
    },[hasDropped])

    const styles = style({isPrimaryColor})

    const getMoveData = (selectedPiece) => {

        const targetX = (indexX - selectedPiece.x)/2;
        const targetY = (indexY - selectedPiece.y)/2;
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
        const selectedPiece = getSelected(pieces);
        setHasDropped(true);
        console.log("---------------");
        setLastMove(selectedPiece, app, setApp);
        console.log(selectedPiece);

        const {prevX, prevY} = {...selectedPiece};
        
        const data = getMoveData(selectedPiece);
        const hasEaten = data.hasEaten;
        const srcId = event.dataTransfer.getData('srcId');

        let [x,y] = srcId.split('-')[1].split('');

        x = parseInt(x);
        y = parseInt(y);

        // movePiece
        movePieceTo({
            x: indexX,
            y: indexY,
            id: `${x}${y}`
        }, pieces, setPieces)

        // make tile value equal the same as the piece to indicated that it is occupied
        setTileValueAt({
            x: indexX,
            y: indexY,
            value: selectedPiece.value
        }, board, setBoard);
        
        // make the previous tile the piece was on neutral to indicate that it is unoccupied
        setTileValueAt({
            x: prevX,
            y: prevY,
            value: tileValues.neutral
        }, board, setBoard);

        // remove piece that was eaten
        if(hasEaten){

            const toRemove = getPieceAt({
                x: selectedPiece.x - data.x,
                y: selectedPiece.y - data.y
            }, pieces, setPieces);
            

            removePiece(toRemove.id, pieces, setPieces);

            // make sure that the tile that occupied the we piece we removed is now neutral
            setTileValueAt({
                x: selectedPiece.x - data.x,
                y: selectedPiece.y - data.y,
                value: tileValues.neutral
            }, board, setBoard);


            console.log("selectedPiece", selectedPiece);
            if(!canPieceEat(selectedPiece, board)){
                setApp(previous => {
                    const newAppState = { ...previous };
                    const last = newAppState.playersTurn;
                    console.log('last', last);
                    newAppState.playersTurn = last === tileValues.player1 ? tileValues.player2 : tileValues.player1;
        
                    return newAppState;
                });

            }

        }else{
            setApp(previous => {
                const newAppState = { ...previous };
                const last = newAppState.playersTurn;
                newAppState.playersTurn = last === tileValues.player1 ? tileValues.player2 : tileValues.player1;
    
              return newAppState;
            });
            

        }
        
        

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
