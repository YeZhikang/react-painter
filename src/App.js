import React, { createContext, useEffect, useReducer } from 'react';
import './App.css';
import Canvas from "./components/canvas";
import DrawContext from "./utils/context";
import ToolBar from "./components/ToolBar";
import '@ant-design/icons'
import antd from 'antd'
// const reducer = (state = 0, action) => {
//     switch (action.type) {
//         case 'ADD':
//             return state + 1
//         case 'MINUS':
//             return state - 1
//     }
// }
//
// const useCountReducer = () => {
//     const { state: count, dispatch: countDispatch } = useContext(Context)
//
//     return { count, countDispatch }
// }
//
// const CountButton = ({ children, onClick }) => {
//     const { count, countDispatch } = useCountReducer()
//
//     useEffect(() => {
//         console.log('yep')
//     },[onClick])
//
//     return (
//         <>
//             <button onClick={ () => countDispatch({ type: 'ADD' }) }>增加</button>
//             { children }
//         </>
//     )
// }
//
// const CatchCount = () => {
//     const { count, countDispatch } = useCountReducer()
//
//     useEffect(() => {
//         console.log(count + ' -- - - - -- changed!')
//     }, [count])
//
//     return (
//         <>
//             { count }
//         </>
//     )
// }
//
// const initialState = 0
// const Context = React.createContext()
//
//
// function App(props) {
//     const [state, dispatch] = useReducer(reducer, initialState)
//     const [count, setCount] = useState(0)
//
//     const cb = useCallback(() => {
//         console.log('it is changed')
//     }, [count])
//
//     return (
//         <>
//             <Context.Provider value={ { state, dispatch } }>
//                 <CountButton onClick={ cb }>
//                     <CatchCount/>
//                 </CountButton>
//                 { state }
//             </Context.Provider>
//         </>
//     )
// }

// const InfoContext = createContext({ name: 'Yezhikang', age: 20 })
// const BirthContext = createContext({ date: '2000-01-30' })
//
// function Info(props) {
//     return (
//         <InfoContext.Provider value={ { name: 'Yezhikang', age: 20 } }>
//             { props.children }
//         </InfoContext.Provider>
//     )
// }
//
// class InfoRender extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {}
//         console.log('yep')
//     }
//
//     componentDidMount() {
//         this.setState(this.context)
//     }
//
//     render() {
//
//         return (
//             <div>
//
//             </div>
//         );
//     }
//
// }
//
// InfoRender.contextType = InfoContext

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
