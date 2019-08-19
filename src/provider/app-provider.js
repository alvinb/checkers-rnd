import React, { useState, createContext } from 'react';
import { tileValues, gameState } from './../util/game'

export const AppContext = createContext();
export const BoardContext = createContext();
export const PieceContext = createContext();
export const TileContext = createContext();



export const AppProvider = props => {
    const [app, setApp] = useState({
        size: 8,
        gameStatus: gameState.setup, // status of the game: setup|started|ended
        isAiEnabled: true, // to enable/disable AI as opponent
        lastMove: {}, // the piece that was moved last
        playersTurn: 0 // neither player1 or two since we need to setup game first
    });
    // const [players, setPlayers] = useState([])
    const [board, setBoard] = useState([
        // {
        //     indexX: 0,
        //     indexY: 0,
        //     isTaken: false
        // },
        // {
        //     indexX: 1,
        //     indexY: 0,
        //     isTaken: false
        // },
        // {
        //     indexX: 2,
        //     indexY: 0,
        //     isTaken: false
        // },
        // {
        //     indexX: 3,
        //     indexY: 0,
        //     isTaken: false
        // }
    ]);
    const [pieces, setPieces] = useState([]);
    const [tiles, setTiles] = useState([]);

    return (
        <AppContext.Provider value={{app, setApp}}>
        <BoardContext.Provider value={{board, setBoard}}>
        <TileContext.Provider value={{tiles, setTiles}}>
        <PieceContext.Provider value={{pieces, setPieces}}>
            { props.children }
        </PieceContext.Provider>
        </TileContext.Provider>
        </BoardContext.Provider>
        </AppContext.Provider>
    );
}

export const Connect = (Component) => {
    return (props) => {
        return <AppProvider><Component {...props} /></AppProvider>
    }
}