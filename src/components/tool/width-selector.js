import React, { useContext } from "react";
import DrawContext from "../../utils/context";

const boldArr = [
    2,
    4,
    8,
    12
]

function WidthRadio(props) {
    const { state, dispatch } = useContext(DrawContext)

    function handleChangeWidth() {
        dispatch({ type: 'MODIFY', value: { width: props.bold, type: state.type === 'eraser' ? 'pencil' : state.type } })
        console.log(state)
    }

    return (
        <div
            onClick={ handleChangeWidth }
            className={ 'width-radio' }
        >
            <div
                style={ { width: props.bold + 2 + 'px', height: props.bold + 2 + 'px' } }
                className={ 'width-circle' }
            />
        </div>
    )
}

export default function WidthSelector(props) {
    return (
        <>
            { boldArr.map(item => <WidthRadio bold={ item } key={item}/>) }
        </>
    )
}

