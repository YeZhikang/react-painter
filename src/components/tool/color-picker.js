import React from "react";

function ColorPicker(props) {
    function handlePickColor() {
        props.checkColor(props.color)
    }

    return (
        <div
            onClick={ handlePickColor }
            className={ 'color-picker' }
            style={ { backgroundColor: props.color } }
        />
    )
}

export default ColorPicker
