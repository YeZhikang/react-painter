import React, { createContext, createRef, useContext, useEffect } from "react";
import DrawContext from "../utils/context";
import Chooser from "../utils/strategic-canvas";





function loadingImage() {

}

let currentIndex = 0;
let imageCache = [];
let isRender = false;

function Canvas(props) {
    let ctx = null;
    let isDown = false;
    let beginAt = [0, 0];
    let target = null;
    let lineStyle = {};


    const { state, dispatch } = useContext(DrawContext);

    useEffect(() => {
        let value = {}
        const canvas = document.querySelector('.container')
        if (!canvas.getContext) return;
        ctx = canvas.getContext('2d')
        ctx.moveTo(0, 0)
        target = canvas;
        lineStyle = state;
        if (!isRender) {
            isRender = true;
            saveImage()
        }
        if (state.clear) {
            clearAll()
            imageCache = [];
            isRender = false;
            currentIndex = 0;

            dispatch({
                type: 'MODIFY',
                value: {
                    clear: false,
                    type: 'pencil',
                    currentIndex,
                    len: imageCache.length
                }
            })
        } else if (state.back) {
            if(currentIndex > 1){
                currentIndex = currentIndex - 1
                // console.log(currentIndex)
                // console.log(imageCache)
                // console.log(imageCache.slice(currentIndex))
                ctx.putImageData(imageCache.slice(currentIndex - 1)[0], 0, 0)
            }
            dispatch({
                type: 'MODIFY',
                value: {
                    back: false,
                    currentIndex,
                    len: imageCache.length
                }
            })
        } else if (state.forward) {
            if(currentIndex < imageCache.length){
                currentIndex = currentIndex + 1
                // console.log(currentIndex)
                // console.log(imageCache)
                // console.log(imageCache.slice(currentIndex))
                // console.log(imageCache)
                ctx.putImageData(imageCache.slice(currentIndex - 1)[0], 0, 0)
            }
            dispatch({
                type: 'MODIFY',
                value: {
                    forward: false,
                    currentIndex,
                    len: imageCache.length
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
        imageCache.splice(currentIndex, imageCache.length - currentIndex)
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
        currentIndex += 1;
        imageCache.splice(currentIndex - 1, imageCache.length - currentIndex + 1, ctx.getImageData(0, 0, target.width, target.height))
    }

    function loadingImage() { //导入画布数据
        ctx.putImageData(imageCache.slice(-1)[0], 0, 0)
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

            if(state.type.includes('Filled')){
                ctx.fillStyle = lineStyle.color
            }
            chooser.draw(ctx, e, target, beginAt, loadingImage)
        }
    }


    const handleUp = (e) => {
        beginAt = [0, 0]
        isDown = false;
        saveImage()
        dispatch({
            type: 'MODIFY',
            value: {
                currentIndex,
                len: imageCache.length
            }
        })
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
