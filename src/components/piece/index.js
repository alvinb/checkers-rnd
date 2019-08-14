import React, {useContext, useState, useEffect} from 'react';
import { css } from 'aphrodite/no-important';
import { style } from './style';


import { PieceContext, AppContext, BoardContext } from './../../provider/app-provider';

import { tileValues } from './../../util/game';
import { setCanMoveTo, resetTileState } from "./../../util/tiles";
import {
    getHoveredPiece,
    selectPiece,
    unSelectPiece
} from "./../../util/pieces";


const Piece = ({ posX, posY, value, isKing, isSelected, id, x, y }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { pieces, setPieces } = useContext(PieceContext);
    const { board, setBoard } = useContext(BoardContext);

    const { app, setApp } = useContext(AppContext);
    
    const styles = style({posX, posY, isHovered});

    useEffect(() =>{
        if(isHovered){
            setCanMoveTo(getHoveredPiece(id, pieces), board, setBoard);
        }else{
            resetTileState(board, setBoard);
        }
    },[isHovered])

    
    const handleMouseEnter = (e) => {
        if(app.playersTurn !== value){
            return;
        }
        
        setIsHovered(true);
    }
    const handleMouseLeave = e => {
        if (app.playersTurn !== value) {
          return;
        }

        setIsHovered(false);

    };

    // const handleClick = e => {
    //     if (app.playersTurn !== value) {
    //       return;
    //     }
    //     setPieces(previousPieces => {
    //         const newPieces = previousPieces.map(piece => {
    //             if(piece.id === id){
    //                 piece.isSelected = !isSelected
    //             }else{
    //                 piece.isSelected = false;
    //             }

    //             return piece;
    //         });
    //         return newPieces;
    //     })
    // }

    const dragStart = (event) => {
        console.log('drag start');
        event.dataTransfer.setData('srcId', event.target.id);

        if (app.playersTurn !== value) {
            return;
        }
        selectPiece(id, pieces, setPieces);

    }

    const dragEnd = () => {
        console.log("drag end");
        unSelectPiece(id, pieces, setPieces);
    };


    const dragOver = (event) => {
        event.preventDefault();
    }

    return (
        <div
            id={`piece-${id}`}
            className={`${css(styles['player' + value], isKing && styles.king)}`}
            draggable='true'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // onClick={handleClick}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragEnd}

        />
  );
};

export default Piece;
