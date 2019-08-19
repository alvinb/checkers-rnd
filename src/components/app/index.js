import React, { useState, useContext, useEffect } from 'react';

import { AppContext, BoardContext, PieceContext , Connect } from './../../provider/app-provider';
import './app.css';

//components
import Board from './../board';
import Message from "./../message";
import Button from "./../button";


//components
import {
  gameState,
  getGameStatus,
  messages,
  tileValues,
  setGameStatus,
  shuffle
} from "./../../util/game";

// util
import {
  setPieceStates,
  selectPiece,
  getPossibleMoves,
  movePieceTo,
  unSelectPiece,
  removePiece,
  getPieceAt,
  getMoveVector,
  canPieceEat
} from "./../../util/pieces";
import {
  setCanMoveTo,
  resetTileState,
  setTileValueAt
} from "./../../util/tiles";

function App() {
    const { app, setApp} = useContext(AppContext);
    const { board, setBoard } = useContext(BoardContext);
    const { pieces, setPieces } = useContext(PieceContext);
    const [message, setMessage] = useState('');

    // effect for updating the states of the pieces
    useEffect(() => {
        console.log('================');
        console.log(app);
        if(pieces.length > 0){
            setPieceStates(pieces, setPieces, {
                player: app.playersTurn,
                tiles: board
            });

        }

    },[app.playersTurn])

    // effect for updating the states of the game
    useEffect(() => {
        console.log(app);
        if(app.gameStatus === gameState.started){
            const newGameState = getGameStatus(app, pieces);
            console.log("newGameState", newGameState);
            switch(newGameState){
                case gameState.player1Wins:
                    setMessage(messages.player1Wins);
                    break;
                case gameState.player2Wins:
                    setMessage(messages.player2Wins);
                    break;
                case gameState.started:
                    if(app.playersTurn === tileValues.player1){
                        setMessage(messages.player1sTurn);
                    }else{
                        setMessage(messages.player2sTurn);
                    }
                    break;
                default:
                    setMessage(messages.loading);
            }

        }

    },[app.playersTurn, app.gameStatus])

    //effect for the AI
    useEffect(() => {
        const newGameState = getGameStatus(app, pieces);
        if(!app.isAiEnabled && newGameState !== gameState.started) return;

        if(app.playersTurn === tileValues.player1){
            const validPieces = pieces.filter((piece) => {
                return piece.canMove;
            });

            // add a small delay so user can see the move
            setTimeout(() => {
                moveAiPiece(validPieces)
            }, 500);


        }
    },[app.playersTurn])


    // this function is incharge of how the AI behaves. It also updates the tiles and pieces when the move is made
    const moveAiPiece = validPieces => {
        validPieces = shuffle(validPieces);
        
        // select the piece to move
        const piece = validPieces.shift();
        
        if(typeof piece === 'undefined') return;
        
        const {x,y} = piece;
        
        // hightlight possible moves
        setCanMoveTo(piece, board, setBoard)
        const possibleMoves = getPossibleMoves(piece, board);
        const move = shuffle(possibleMoves).shift();

        //move the piece
        movePieceTo({
            x: move.indexX,
            y: move.indexY,
            id: piece.id
        }, pieces, setPieces)

        //unselect piece
        unSelectPiece(piece.id, pieces, setPieces);

        // remove tile hightlights
        resetTileState(board, setBoard);

        //update tile values

        // make tile value equal to the piece we moved to indicate that it is occupied
        setTileValueAt({
            x: move.indexX,
            y: move.indexY,
            value: piece.value
        }, board, setBoard);
        
        // set the previous tile the piece was on neutral to indicate that it is unoccupied
        setTileValueAt({
            x: x,
            y: y,
            value: tileValues.neutral
        }, board, setBoard);
        //update piece values
        if(hasEaten({x: x, y: y}, move)){
            const moveVector = getMoveVector({x: x, y: y}, move);
            const toRemove = getPieceAt({
                x: x + moveVector.x,
                y: y + moveVector.y
            }, pieces, setPieces);
            console.log('----has eaten----');
            console.log(`(x,y): (${x},${y})`);
            console.log(`move vector: ${moveVector.x}, ${moveVector.y}`);
            removePiece(toRemove.id, pieces, setPieces);
            
            // make sure that the tile that occupied the piece we removed is now neutral
            setTileValueAt({
                x: x + moveVector.x,
                y: y + moveVector.y,
                value: tileValues.neutral
            }, board, setBoard);

            if(!canPieceEat(piece, board)){
                setApp(previous => {
                    const newAppState = { ...previous };
                    const last = newAppState.playersTurn;
                    console.log('last', last);
                    newAppState.playersTurn = last === tileValues.player1 ? tileValues.player2 : tileValues.player1;
        
                    return newAppState;
                });

            }else{
                setTimeout(() => {
                    const newValidPieces = pieces.filter((piece) => {
                        return piece.canMove;
                    });
                    debugger;
                    moveAiPiece(newValidPieces);
                }, 500);
            }
        }else{
            setApp(previous => {
                const newAppState = { ...previous };
                const last = newAppState.playersTurn;
                newAppState.playersTurn = last === tileValues.player1 ? tileValues.player2 : tileValues.player1;
    
              return newAppState;
            });
            

        }

    };

    const resetGame = () => {
        setGameStatus({
            gameStatus: gameState.setup,
            playersTurn: 0
        }, app, setApp);
    }

    const hasEaten = (piece, tile) => {
        const targetX = (tile.indexX - piece.x)/2;
        const targetY = (tile.indexY - piece.y)/2;
        if(Math.abs(targetX) < 1 || Math.abs(targetY) < 1){
            return false;
        }

        return true;
    }
    
    return (
        <div className="App">
            <div className="checkers">
                <Board size={app.size}/>
            </div>
            <div className="message">
                <Message text={message}/>
            </div>
        </div>
    );
}

export default Connect(App);
