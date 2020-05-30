import React, { createRef, useContext, useState } from "react";
import DrawContext from "../utils/context";
import {PieChartOutlined, EditOutlined, RollbackOutlined }  from '@ant-design/icons';
import {Popover,Button} from "antd";
import Eraser from "./tool/eraser";
import ClearAll from "./tool/clear-all";
import WidthSelector from "./tool/width-selector";
import RectangleUse from "./tool/rectangle-use";
import ColorPicker from "./tool/color-picker";

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




function CurrentStatus({ width, color }){
    return (
        <div className={'current-status'}>
            <div
                className={ 'color-picker' }
                style={ { backgroundColor: color } }
            />
            <div
                className={ 'width-radio' }
                style={{marginRight: 0}}
            >
                <div
                    style={ { width: width + 2 + 'px', height: width + 2 + 'px' } }
                    className={ 'width-circle' }
                />
            </div>
        </div>
    )
}

function Pencil(){

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
        <Button className={'rectangle-button'} style={{paddingRight:'0'}} onClick={handleChangePencil} type={"link"}>
            <EditOutlined/>
        </Button>
    )
}

function BackButton(){

    const { state, dispatch } = useContext(DrawContext)

    function handleBack() {
        dispatch({
            type: 'MODIFY',
            value: {
                back: true
            }
        })
    }
    return (
        <Button className={'rectangle-button'} style={{paddingRight:'0'}} onClick={handleBack} type={"link"}>
            <RollbackOutlined/>
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
            <WidthSelector/>
            <Eraser/>
            <Pencil/>
            <BackButton/>
            <RectangleUse/>

            <ClearAll/>
            <CurrentStatus width={state.width} color={state.color}/>
        </div>
    )
}
