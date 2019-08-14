import React, { useState, useContext, useEffect } from "react";
import { css } from "aphrodite/no-important";
import { style } from "./style";

//context
import { BoardContext, PieceContext } from './../../provider/app-provider';

//components
import Tile from './../tile';
import Piece from './../piece';

//util
import { 
    tileValues,
    getPosX, 
    getPosY
} from './../../util/game';


const Board = ({size}) => {
    const styles = style();

    const { board, setBoard } = useContext(BoardContext);
    const { pieces, setPieces } = useContext(PieceContext);

    // const [eatDirection, setEatDirection] = useState(null);


    //set up. runs only once. same as componentDidMount
    useEffect(() => {

        const boardData = [];
        const pieceData = [];
        let isPrimaryColor = true;
        let value = -1;

        if(!size) return;

        for(let y = 0; y < size; y++){
            if(y%2 === 0) {
                isPrimaryColor = true;
                
            }else{
                isPrimaryColor = false;
            }
            for(let x = 0; x < size; x++ ){
                if(!isPrimaryColor){
                    value = tileValues.notUsed;
                }
                else if( y <= 2 && isPrimaryColor){
                    value = tileValues.player1;
                    pieceData.push({
                        value: value,
                        isKing: false,
                        posX: getPosX(x),
                        posY: getPosY(y),
                        x: x,
                        y: y,
                        isSelected: false,
                        isHovered: false,
                        id: `${x}${y}`
                    });
                }else if(y >= 5 && isPrimaryColor){
                    value = tileValues.player2;
                    pieceData.push({
                      value: value,
                      isKing: false,
                      posX: getPosX(x),
                      posY: getPosY(y),
                      x: x,
                      y: y,
                      isSelected: false,
                      isHovered: false,
                      id: `${x}${y}`
                    });
                }else{
                    value = tileValues.neutral;
                }
                boardData.push({
                    indexX: x,
                    indexY: y,
                    value: value,
                    isPrimaryColor: isPrimaryColor,
                    canMoveTo: false
                });

                isPrimaryColor = !isPrimaryColor;
            }
        }
        setBoard(boardData);
        setPieces(pieceData);
    }, [])


    return (
        <div className={css(styles.board)}>
            {board.map((tile, i) => (
                <Tile 
                    indexX={tile.indexX}
                    indexY={tile.indexY}
                    isPrimaryColor={tile.isPrimaryColor}
                    value={tile.value}
                    canMoveTo={tile.canMoveTo}
                    key={i}/>
            ))}
            {pieces.map( (piece, i) => (
                <Piece
                    value={piece.value}
                    isKing={piece.isKing}
                    isSelected={piece.isSelected}
                    isHovered={piece.isHovered}
                    posX={piece.posX}
                    posY={piece.posY}
                    x={piece.x}
                    y={piece.y}
                    id={piece.id}
                    key={i} />
            ))}

        </div>

    );
};


export default Board;
