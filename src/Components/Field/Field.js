import React, { Component } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import field from "./resources/skystone_field.jpg";

export default class Field extends Component {
    fieldDivStyle = {
        border: '1px solid red',
        float: 'left',
        width : '50%',
    };

    render() {
        return (
            <div
                style={this.fieldDivStyle}>
                <TransformWrapper
                    defaultScale={1}
                    defaultPositionX={0}
                    defaultPositionY={0}

                    pan={{
                        velocity: false
                    }}
                    options={{
                        limitToWrapper: false,
                        limitToBounds: false,
                    }}

                >
                    <TransformComponent>
                        <img src={field} />
                    </TransformComponent>
                </TransformWrapper>
            </div>
        );
    }
}