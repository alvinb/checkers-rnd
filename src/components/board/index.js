import React, { useState, useContext, useEffect } from "react";
import { css } from "aphrodite/no-important";
import { style } from "./style";

//context
import { BoardContext, PieceContext } from './../../provider/app-provider';

//components
import Tile from './../tile';
import Piece from './../piece';

//util
import { tileValues, getPosX, getPosY, tileContainsEnemy, direction, isOccupied } from './../../util/game';


const Board = ({size}) => {
    const styles = style();

    const { board, setBoard } = useContext(BoardContext);
    const { pieces, setPieces } = useContext(PieceContext);
    const [p1Targets, setP1Targets] = useState([]);
    const [p2Targets, setP2Targets] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState([]);
    const [eatDirection, setEatDirection] = useState(null);


    //set up
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

    useEffect(() => {
        //reset tiles first
        setBoard(previous => {
            const newTiles = [...previous];
            newTiles.forEach(tile => {
                tile.canMoveTo = false;
            })

            return newTiles;
        })


        const selectedPiece = pieces.filter(piece => {
            return piece.isSelected;
        });
        const hoveredPiece = pieces.filter(piece => {
          return piece.isHovered;
        });
        const neutralTiles = board.filter(tile => {
            return tile.value === tileValues.neutral;
        });

        const validTiles = board.filter(tile => {
            return tile.value !== tileValues.notUsed;
        });
        if(selectedPiece[0]){
            setSelectedPiece(selectedPiece[0]);

            getValidMoves(validTiles, selectedPiece[0])
        }else if(!selectedPiece[0] && hoveredPiece[0]){
            getValidMoves(validTiles, hoveredPiece[0])
        }

    }, [pieces])

    const updateTargetArr = (piece, target) => {
        if(piece.value === tileValues.player1){
            setP1Targets(p1Targets.push(target));
        }else if(piece.value === tileValues.player2){
            setP2Targets(p2Targets.push(target));            
        }
    }

    const getPieceAt = (x,y) => {
        const result = pieces.filter(piece => {
            return piece.id === `${x}${y}`;
        })
        return result.length > 0 ? result[0]: null;
    }
    const getValidMoves = (validTiles, selectedPiece) => {
        const result = [];

        const tilesAtOffset1 = getTilesWithOffset(validTiles, selectedPiece, 1);
        const tilesAtOffset2 = getTilesWithOffset(validTiles, selectedPiece, 2);

        tilesAtOffset1.forEach(tile => {
            if(!isOccupied(tile)){
                result.push(tile);
            }

            if(tileContainsEnemy(selectedPiece.value, tile.value) ){
                if(canEatAtTile(tile)){
                    updateTargetArr(selectedPiece, getPieceAt(tile.indexX, tile.indexY));
                    result.push(tile);
                }

            }
        });

        setBoard(previous => {
            const newBoard = [...previous];
            
            newBoard.forEach(tile => {
                result.forEach(validTile =>{
                    if(tile.indexX === validTile.indexX && tile.indexY === validTile.indexY){
                        tile.canMoveTo = true;
                    }
                })
            });

            return newBoard;

        })

    }
    const canEatAtTile = (tile) => {
        const pCoordinates = selectedPiece.id.split("");
        const px = parseInt(pCoordinates[0]);
        const py = parseInt(pCoordinates[1]);

        if(px > tile.indexX){
            if(py > tile.indexY){
                setEatDirection(direction.topLeft);
            }else{
                setEatDirection(direction.bottomLeft);
            }
        }else{
            if(py < tile.indexY){
                setEatDirection(direction.bottomRight);
            }else{
                setEatDirection(direction.topRight);
            }
        }

        switch(eatDirection){
            case direction.topRight:
                return tile.indexX+2 === px && tile.indexY-2 === py;
            case direction.bottomRight:
                return tile.indexX+2 === px && tile.indexY+2 === py;
            case direction.bottomLeft:
                return tile.indexX-2 === px && tile.indexY+2 === py;
            case direction.topLeft:
                return tile.indexX-2 === px && tile.indexY-2 === py;
            default:
                return false;

        }

    }
    const getTilesWithOffset = (tiles, piece, offset) => {
        const pCoordinates = piece.id.split("");
        const px = parseInt(pCoordinates[0]);
        const py = parseInt(pCoordinates[1]);

        return tiles.filter(tile => {

            if(piece.isKing){
                return (
                    tile.indexX === px - offset ||
                    tile.indexX === px + offset ||
                    tile.indexY === py - offset ||
                    tile.indexY === py + offset
                );
            }
            else if(piece.value === tileValues.player1){
                return (
                    ( tile.indexX === px-offset && tile.indexY === py+offset) ||
                    ( tile.indexX === px+offset && tile.indexY === py+offset )
                )
            }
            else if(piece.value === tileValues.player2){
                return (
                    ( tile.indexX === px-offset && tile.indexY === py-offset) ||
                    ( tile.indexX === px+offset && tile.indexY === py-offset )
                )
            }
        })
    }
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
                    id={piece.id}
                    key={i} />
            ))}

        </div>

    );
};


export default Board;
