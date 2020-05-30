import React, { createRef, useContext, useEffect, useState } from "react";
import DrawContext from "../../utils/context";

function Eraser(props) {
    const { state, dispatch } = useContext(DrawContext)
    const [ eraser, setEraser ] = useState(false)
    const eraserRef = createRef()

    useEffect(() => {
        if(state.type !== 'eraser'){
            eraserRef.current.classList.remove('eraser--active')
        }
    }, [state])

    function handleClickEraser(){
        if(!eraser){
            eraserRef.current.classList.add('eraser--active')
            dispatch({
                type: 'MODIFY',
                value:{
                    type: 'eraser'
                }
            })
        }else{
            eraserRef.current.classList.remove('eraser--active')
            dispatch({
                type: 'MODIFY',
                value:{
                    type: 'pencil'
                }
            })
        }

        setEraser(!eraser)
    }

    return(
        <div ref={eraserRef} onClick={handleClickEraser} className={'eraser'}/>
    )
}

export default Eraser
