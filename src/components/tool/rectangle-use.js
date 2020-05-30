import { Button, Popover } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import DrawContext from "../../utils/context";
import rectangleArr from "../../utils/rectangle-image-output";

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
            { rectangleArr.map(item => <RectangleUnit key={item.name} filename={ item.src } typeName={item.name} />) }
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
