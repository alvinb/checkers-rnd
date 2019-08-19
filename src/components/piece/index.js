import React, {useContext, useState, useEffect} from 'react';
import { css } from 'aphrodite/no-important';
import { style } from './style';


import { PieceContext, AppContext, BoardContext } from './../../provider/app-provider';

import { setCanMoveTo, resetTileState } from "./../../util/tiles";
import {
  getHoveredPiece,
  selectPiece,
  unSelectPiece
} from "./../../util/pieces";



const Piece = ({ posX, posY, value, isKing, isSelected, id, x, y, canMove }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isHoverDisabled] = useState(false);

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
        console.log('isHoverDisabled', isHoverDisabled);
        console.log('player turn', app.playersTurn);
        if(!canMove) return;

        if (app.playersTurn !== value ) {
          return;
        }
        
        setIsHovered(true);
    }
    const handleMouseLeave = e => {

        setIsHovered(false);

    };


    const dragStart = (event) => {
        event.dataTransfer.setData('srcId', event.target.id);

        if (app.playersTurn !== value) {
            return;
        }
        selectPiece(id, pieces, setPieces);
        

    }

    const dragEnd = () => {
      unSelectPiece(id, pieces, setPieces);
    };

    const dragOver = (event) => {
        event.preventDefault();
    }

    return (
        <div
            id={`piece-${id}`}
            className={`${css(styles['player' + value], isKing && styles.king, canMove && styles.canMove)}`}
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
