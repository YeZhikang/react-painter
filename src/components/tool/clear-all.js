import React, { useContext } from "react";
import DrawContext from "../../utils/context";
import Canvas2Image from "../../utils/canvas2image";


function ExportImages() {
    const exportImage = () => {
        const canvas = document.querySelector('.container')
        Canvas2Image.saveAsPNG(canvas, canvas.width, canvas.height)
    }

    return (
        <span onClick={exportImage} className={'clear-button'}>导出图片</span>
    )
}

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

export  {ClearAll, ExportImages}
