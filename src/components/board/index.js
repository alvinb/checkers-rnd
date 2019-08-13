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
    getPosY, 
    tileContainsEnemy, 
    direction, 
    isOccupied,
    getIndexX,
    getIndexY,
    isOccupiedAt
} from './../../util/game';


const Board = ({size}) => {
    const styles = style();

    const { board, setBoard } = useContext(BoardContext);
    const { pieces, setPieces } = useContext(PieceContext);
    const [p1Targets, setP1Targets] = useState([]);
    const [p2Targets, setP2Targets] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState([]);
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


    // run callback when pieces update
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


        const validTiles = board.filter(tile => {
            return tile.value !== tileValues.notUsed;
        });

        // when user has selected a piece
        if(selectedPiece[0]){
            setSelectedPiece(selectedPiece[0]);

            getValidMoves(validTiles, selectedPiece[0])
        }
        // when user has not selected a piece but is hovering onto one 
        else if(!selectedPiece[0] && hoveredPiece[0]){
            getValidMoves(validTiles, hoveredPiece[0])
        }

    }, [pieces])


    const updateTargetArr = (piece, target) => {
        if(!piece.isSelected) return;

        if(piece.value === tileValues.player1){
            setP1Targets(previous => [...previous, target]);
        }else if(piece.value === tileValues.player2){
            setP2Targets(previous => [...previous, target]);
        }
    }

    const getPieceAt = (x,y) => {
        const result = pieces.filter(piece => {
            return piece.posX === getPosX(x) && piece.posY === getPosY(y);
        })
        return result.length > 0 ? result[0]: null;
    }

    const getTileAt = (x, y, tiles) => {
        return tiles.find(tile => {
            return tile.indexX === x && tile.indexY === y;
        });
    }

    // updates Board with all the valid tiles that the current piece can move to
    const getValidMoves = (validTiles, piece) => {
        const result = [];

        const tilesAtOffset1 = getTilesWithOffset(validTiles, piece, 1);
        const tilesAtOffset2 = getTilesWithOffset(validTiles, piece, 2);
        console.log('tilesAtOffset2',tilesAtOffset2);
        tilesAtOffset1.forEach(tile => {
            if(!isOccupied(tile)){
                result.push(tile);
            }

            if(tileContainsEnemy(piece.value, tile.value) ){
                let destinationTile = canEatAtTile(tile, tilesAtOffset2);
                if(destinationTile){
                    updateTargetArr(piece, getPieceAt(tile.indexX, tile.indexY));
                    result.push(destinationTile);
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
    const canEatAtTile = (tile, tilesAtOffset2) => {
        const px = getIndexX(selectedPiece.posX);
        const py = getIndexY(selectedPiece.posY);
        let d = null;
        if(px > tile.indexX){
            if(py > tile.indexY){
                // setEatDirection(direction.topLeft);
                d = direction.topLeft;
            }else{
                // setEatDirection(direction.bottomLeft);
                d = direction.bottomLeft;
            }
        }else{
            if(py < tile.indexY){
                // setEatDirection(direction.bottomRight);
                d = direction.bottomRight;
            }else{
                // setEatDirection(direction.topRight);
                d = direction.topRight;
            }
        }
        // console.log('eatDirection', eatDirection);
        console.log('eat d', d);
        let destination = null;
        switch(d){
            case direction.topRight:
                destination = getTileAt(tile.indexX+1, tile.indexY-1, tilesAtOffset2);
                break;
            case direction.bottomRight:
                destination = getTileAt(tile.indexX+1, tile.indexY+1, tilesAtOffset2);
                break;
            case direction.bottomLeft:
                destination = getTileAt(tile.indexX-1, tile.indexY+1, tilesAtOffset2);
                break;
            case direction.topLeft:
                destination = getTileAt(tile.indexX-1, tile.indexY-1, tilesAtOffset2);
                break;
            default:
                // do nothing

        }
        return destination && !isOccupied(destination)? destination : null;


    }
    const getTilesWithOffset = (tiles, piece, offset) => {
        const px = getIndexX(piece.posX);
        const py = getIndexY(piece.posY);
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
                    x={piece.x}
                    y={piece.y}
                    id={piece.id}
                    key={i} />
            ))}

        </div>

    );
};


export default Board;
