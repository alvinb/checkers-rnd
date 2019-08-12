import React, { useState, createContext } from 'react';

export const AppContext = createContext();
export const BoardContext = createContext();
export const PieceContext = createContext();




export const AppProvider = props => {
    const [app, setApp] = useState({
        size: 8,
        player1PieceCount: 12,
        playerTwoPieceCount: 12,
        isGameOver: false
    });
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

    return (
        <AppContext.Provider value={{app, setApp}}>
        <BoardContext.Provider value={{board, setBoard}}>
        <PieceContext.Provider value={{pieces, setPieces}}>
            { props.children }
        </PieceContext.Provider>
        </BoardContext.Provider>
        </AppContext.Provider>
    );
}

export const Connect = (Component) => {
    return (props) => {
        return <AppProvider><Component {...props} /></AppProvider>
    }
}