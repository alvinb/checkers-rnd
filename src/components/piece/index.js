import React, {useContext, useState} from 'react';
import { css } from 'aphrodite/no-important';
import { style } from './style';


import { PieceContext } from './../../provider/app-provider';


const Piece = ({ posX, posY, value, isKing, isSelected, id, isHovered }) => {
    console.log(id);
    const { pieces, setPieces } = useContext(PieceContext);
    
    const styles = style({posX, posY, isHovered});
    
    const handleMouseEnter = (e) => {
        if(isSelected) return;
        
        setPieces(previousPieces => {
            const newPieces = previousPieces.map(piece => {
                if (piece.id === id) {
                    piece.isHovered = true;
                }else{
                    piece.isHovered = false;
                }

                return piece;
            });

            return newPieces;
        });


    }
    const handleMouseLeave = e => {
        if (isSelected) return;

        setPieces(previousPieces => {
            const newPieces = previousPieces.map(piece => {
                piece.isHovered = false;

                return piece;
          });

          return newPieces;
        });

    };

    const handleClick = e => {
        setPieces(previousPieces => {
            const newPieces = previousPieces.map(piece => {
                if(piece.id === id){
                    piece.isSelected = !isSelected
                }else{
                    piece.isSelected = false;
                }

                return piece;
            });
            return newPieces;
        })
    }

    return (
        <div
            className={`${css(styles['player' + value], !isSelected && isHovered && styles.hovered, isKing && styles.king, isSelected && styles.selected)}`}
            draggable='true'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        />
  );
};

export default Piece;
