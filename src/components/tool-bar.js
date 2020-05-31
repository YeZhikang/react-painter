import React, { createRef, useContext, useEffect, useState } from "react";
import DrawContext from "../utils/context";
import { PieChartOutlined, EditOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { Popover, Button } from "antd";
import Eraser from "./tool/eraser";
import {ClearAll, ExportImages} from "./tool/clear-all";
import WidthSelector from "./tool/width-selector";
import RectangleUse from "./tool/rectangle-use";
import ColorPicker from "./tool/color-picker";
import rectangleArr from "../utils/rectangle-image-output";

let backStatus = false;
let forwardStatus = false

const colorArr = [
    '#618ce1',
    '#f5791a',
    '#1ce134',
    '#e12336',
    '#e108c1',
    '#e1e012',
    '#b7e1de',
    '#e1b47a',
    'black'
]

const boldArr = [
    2,
    4,
    8,
    12
]


function CurrentStatus({ width, color }) {
    const { state, dispatch } = useContext(DrawContext)
    const [current, setCurrent] = useState(null)

    useEffect(() => {
        if (['eraser', 'pencil'].includes(state.type)) {
            setCurrent((
                <div
                    className={ 'width-radio' }
                    style={ { marginRight: '0px' } }
                >
                    <div
                        style={ { width: width + 2 + 'px', height: width + 2 + 'px' } }
                        className={ 'width-circle' }
                    />
                </div>
            ))
        } else {
            setCurrent((
                <img
                    style={ { height: '16px' } }
                    src={ rectangleArr.find(item => item.name === state.type).src }
                />
            ))
        }
    }, [state])

    return (
        <div className={ 'current-status fxal' }>
            <div
                className={ 'color-picker' }
                style={ { backgroundColor: color } }
            />
            { current }
        </div>
    )
}

function Pencil() {

    const { state, dispatch } = useContext(DrawContext)

    function handleChangePencil() {
        dispatch({
            type: 'MODIFY',
            value: {
                type: 'pencil'
            }
        })
    }

    return (
        <Button
            className={ 'rectangle-button' }
            style={ { paddingRight: '0' } }
            onClick={ handleChangePencil }
            type={ "link" }
        >
            <EditOutlined/>
        </Button>
    )
}

function BackButton() {

    const { state, dispatch } = useContext(DrawContext)
    const [able, setAble] = useState(false)

    useEffect(() => {
        setAble(state.currentIndex > 1)
        // forwardStatus = state.currentIndex === state.len;
        // console.log(state.currentIndex, state.len)
        //
        // console.log(backStatus)
    }, [state])

    function handleBack() {
        dispatch({
            type: 'MODIFY',
            value: {
                back: true
            }
        })
    }

    return (
        <Button
            disabled={ !able }
            className={ 'rectangle-button' }
            style={ { paddingRight: '0' } }
            onClick={ handleBack }
            type={ "link" }
        >
            <StepBackwardOutlined/>
        </Button>
    )
}

function ForwardButton() {
    const { state, dispatch } = useContext(DrawContext)

    const [able, setAble] = useState(false)

    useEffect(() => {
        setAble(state.currentIndex !== state.len)
        // forwardStatus = state.currentIndex === state.len;
        // console.log(state.currentIndex, state.len)
        //
        // console.log(backStatus)
    }, [state])

    function handleForward() {
        dispatch({
            type: 'MODIFY',
            value: {
                forward: true
            }
        })
    }

    return (
        <Button
            disabled={ !able }
            className={ 'rectangle-button' }
            style={ { paddingRight: '0' } }
            onClick={ handleForward }
            type={ "link" }
        >
            <StepForwardOutlined/>
        </Button>
    )
}




export default function ToolBar() {

    const { state, dispatch } = useContext(DrawContext)


    function checkColor(color) {
        dispatch({ type: 'MODIFY', value: { color: color } })
    }

    return (
        <div className={ 'tool-bar' }>
            { colorArr.map(item => <ColorPicker
                color={ item }
                checkColor={ checkColor }
                key={ item }
            />) }
            <Pencil/>
            <RectangleUse/>
            <WidthSelector/>
            <Eraser/>
            <BackButton/>
            <ForwardButton/>
            <ExportImages/>
            <ClearAll/>
            <CurrentStatus
                width={ state.width }
                color={ state.color }
            />
        </div>
    )
}
