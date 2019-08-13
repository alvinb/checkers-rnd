import React, { useState, useContext, useEffect } from 'react';

import { AppContext, BoardContext, Connect } from './../../provider/app-provider';
import './app.css';

//components
import Board from './../board';

function App() {
    const {app, setApp} = useContext(AppContext);
    const { board, setBoard } = useContext(BoardContext);


    useEffect( () => {
        setBoard(previous => {
            const newTiles = [...previous];
            newTiles.forEach(tile => {
            tile.canMoveTo = false;
            });

            return newTiles;
        });
    }, [app]) 

    return (
        <div className="App">
            <div className="checkers">
                <Board size={app.size}/>
            </div>
        </div>
    );
}

export default Connect(App);
