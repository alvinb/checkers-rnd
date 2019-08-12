import React, { useContext, useState }from "react";
import { css } from 'aphrodite/no-important';
import { style } from './style';
import { tileValues } from './../../util/game';

import { BoardContext, PieceContext } from "./../../provider/app-provider";

const Tile = ({indexX, indexY, isPrimaryColor, value, canMoveTo}) => {
    const { board, setBoard } = useContext(BoardContext);
    const { pieces, setPieces} = useContext(PieceContext);



    const styles = style({isPrimaryColor})
    
    return (
        <div className={`${css(styles.tile, canMoveTo && styles.canMoveTo)} player${value} ${indexX}-${indexY}`}></div>
    );
};

export default Tile;
