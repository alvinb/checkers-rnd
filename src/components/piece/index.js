import React, {useContext, useState} from 'react';
import { css } from 'aphrodite/no-important';
import { style } from './style';


import { PieceContext } from './../../provider/app-provider';


const Piece = ({ posX, posY, value, isKing, isSelected, id }) => {
    const [isHovered, setHoveredState] = useState(false);
    console.log(id);
    const { pieces, setPieces } = useContext(PieceContext);
    
    const styles = style({posX, posY, isHovered});
    
    const handleMouseEnter = (e) => {
        setHoveredState(true);

    }
    const handleMouseLeave = e => {
        setHoveredState(false);
    };

    const handleClick = e => {
        setHoveredState(!isHovered);
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
