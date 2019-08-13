import React, {useContext, useState} from 'react';
import { css } from 'aphrodite/no-important';
import { style } from './style';


import { PieceContext, AppContext } from './../../provider/app-provider';

import { tileValues } from './../../util/game';


const Piece = ({ posX, posY, value, isKing, isSelected, id, isHovered, x, y }) => {
    const { pieces, setPieces } = useContext(PieceContext);
    const { app, setApp } = useContext(AppContext);
    
    const styles = style({posX, posY, isHovered});
    
    const handleMouseEnter = (e) => {
        if(app.playersTurn !== value){
            return;
        }
        
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
        if (app.playersTurn !== value) {
          return;
        }

        setPieces(previousPieces => {
            const newPieces = previousPieces.map(piece => {
                piece.isHovered = false;

                return piece;
          });

          return newPieces;
        });

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
        setPieces(previousPieces => {
            return previousPieces.map(piece => {
                if (piece.id === id) {
                    piece.isSelected = true;
                } else {
                    piece.isSelected = false;
                }

                return piece;
            });
        });
    }

    const dragEnd = () => {
        console.log("drag end");
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
