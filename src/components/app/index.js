import React, { useState, useContext } from 'react';

import { AppContext, BoardContext, Connect } from './../../provider/app-provider';
import './app.css';

//components
import Board from './../board';

function App() {
    const {app, setApp} = useContext(AppContext);
    return (
        <div className="App">
            <div className="checkers">
                <Board size={app.size}/>
            </div>
        </div>
    );
}

export default Connect(App);
