import React, { createContext, useEffect, useReducer } from 'react';
import './App.css';
import Canvas from "./components/canvas";
import DrawContext from "./utils/context";
import ToolBar from "./components/tool-bar";
import '@ant-design/icons'
import antd from 'antd'

const drawReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET':
            return action.value
        case 'MODIFY':
            return { ...state, ...action.value }
        default:
            return state
    }
}

function randomNum() {
    return Math.floor(50 + Math.random() * 300)
}

function randomXY() {
    return {
        x: randomNum(),
        y: randomNum()
    }
}



function App(props) {
    const [state, dispatch] = useReducer(drawReducer, { width: 2, color: 'black', type: 'pencil' })

    return (
        <div className={'main'}>
            <div>
                <DrawContext.Provider value={{ state, dispatch }}>
                    <ToolBar />
                    <Canvas />
                </DrawContext.Provider>
            </div>
        </div>
    )
}


export default App;
