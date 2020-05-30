import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

// 定义 reducer
const countReducer = ( state = 0, action ) => {
    switch(action.type){
        case 'ADD':
            return state + action.val
        case 'MINUS':
            return state - action.val
        default:
            return state
    }
}

const Store = createStore(countReducer, applyMiddleware(reduxThunk))

export default Store
