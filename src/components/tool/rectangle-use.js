import { Button, Popover } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import DrawContext from "../../utils/context";
import Oblong from '../../static/images/oblong.png'
import RightAngle from '../../static/images/right-angle.png'
import Square from '../../static/images/square.png'
import TopAngle from '../../static/images/top-angle.png'


const rectangleArr = [
    {
        name:'topRectangle',
        src: TopAngle
    },
    {
        name: 'rightRectangle',
        src: RightAngle
    },
    {
        name: 'square',
        src: Square
    },
    {
        name: 'round',
        src: Oblong
    }
]

const RectangleUnit = ({ filename, typeName }) => {
    const {state,dispatch} = useContext(DrawContext)

    function handleClick() {
        dispatch({
            type: 'MODIFY',
            value: {
                type: typeName,
            }
        })
    }
    return (
        <img
            onClick={handleClick}
            className={ 'rectangle-unit' }
            src={  filename }
        />
    )
}

const RectangleUsePopoverContent = () => {
    return (
        <div>
            { rectangleArr.map(item => <RectangleUnit filename={ item.src } typeName={item.name} />) }
        </div>
    )
}


const RectangleUse = () => {
    return (
        <Popover
            content={ RectangleUsePopoverContent }
            trigger="click"

        >
            <Button
                type={ 'link' }
                className={ 'rectangle-button' }
            ><PieChartOutlined/></Button>
        </Popover>
    )
}

export default RectangleUse
