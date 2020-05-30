import React, { useContext } from "react";
import DrawContext from "../../utils/context";

function ClearAll(){
    const { state, dispatch } = useContext(DrawContext)

    const handleClear = () => {
        dispatch({
            type: 'MODIFY',
            value: {
                clear: true
            }
        })
    }
    return(
        <span onClick={handleClear} className={'clear-button'}>清空</span>
    )
}

export default ClearAll
