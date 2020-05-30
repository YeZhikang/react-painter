import React, { createContext, createRef, useContext, useEffect } from "react";
import DrawContext from "../utils/context";
import Chooser from "../utils/strategic-canvas";


function loadingImage() {

}

function Canvas(props) {
    let ctx = null;
    let isDown = false;
    let beginAt = [0, 0];
    let target = null;
    let lineStyle = {};

    let imageCache = null;


    const { state, dispatch } = useContext(DrawContext);

    useEffect(() => {
        const canvas = document.querySelector('.container')
        if (!canvas.getContext) return;
        ctx = canvas.getContext('2d')
        ctx.moveTo(0, 0)
        target = canvas;
        lineStyle = state
        if (state.clear) {
            clearAll()
            dispatch({
                type: 'MODIFY',
                value: {
                    clear: false,
                    type: 'pencil'
                }
            })
        }
        if (state.type === 'eraser') {
            canvasRef.current.classList.add('container--clear')
        } else {
            canvasRef.current.classList.remove('container--clear')
        }

    }, [state])

    // function throttle(fn) {
    //     let timer = Date.now();
    //     console.log(timer)
    //     return function (...args) {
    //         if ((Date.now() - timer) > 200){
    //             timer = Date.now()
    //             fn.call(this,...args)
    //         }
    //     }
    // }

    const clearAll = () => {
        ctx.clearRect(0, 0, target.width, target.height)
    }


    const handleDown = (e) => {
        beginAt = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop + 16]
        isDown = true;
        saveImage()
        console.log('yes')
        ctx.beginPath()
        ctx.moveTo(...beginAt)
    }

    // const drawRectangle = () => {
    //     const [x2, y2] = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop + 16]
    //     const [x3, y3] = [beginAt[0],beginAt[1] + (y2 - beginAt[1]) * 2]
    //     ctx.lineTo(x2,y2)
    //     ctx.lineTo(x3,y3)
    //     ctx.closePath()
    //     ctx.stroke()
    // }

    function saveImage() {  //储存此刻画布数据
        imageCache = ctx.getImageData(0, 0, target.width, target.height)
    }

    function loadingImage() { //导入画布数据
        ctx.putImageData(imageCache, 0, 0)
    }

    const chooser = new Chooser(state.type)

    const handleMove = (e) => {
        if (isDown) {
            ctx.lineWidth = lineStyle.width;
            ctx.strokeStyle = lineStyle.color;
            // if (!(state.type === 'eraser')) {
            //     const [x, y] = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop + 16]
            //     ctx.lineTo(x, y)
            //     ctx.lineWidth = lineStyle.width;
            //     ctx.strokeStyle = lineStyle.color
            //     ctx.stroke()
            // } else {
            //     const [x, y] = [e.pageX - target.offsetLeft - 8, e.pageY - target.offsetTop + 8]
            //     ctx.clearRect(x, y, 16, 16)
            // }

            chooser.draw(ctx, e, target, beginAt, loadingImage)
        }
    }


    const handleUp = (e) => {
        beginAt = [0, 0]
        isDown = false
    }

    const canvasRef = createRef()


    return (
        <canvas
            ref={ canvasRef }
            className={ 'container' }
            onMouseDown={ handleDown }
            onMouseMove={ handleMove }
            onMouseUp={ handleUp }
            width={ 800 }
            height={ 500 }
        >
        </canvas>

    )
}

export default Canvas
