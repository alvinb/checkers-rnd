import React, { useState, createContext } from 'react';
import { tileValues } from './../util/game'

export const AppContext = createContext();
export const BoardContext = createContext();
export const PieceContext = createContext();
export const TileContext = createContext();



export const AppProvider = props => {
    const [app, setApp] = useState({
        size: 8,
        isGameOver: false,
        isAiEnabled: false,
        playersTurn: tileValues.player1 // player 1 moves first
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