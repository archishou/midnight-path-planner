import React from 'react';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import './Field.css'
import field_img from './resources/skystone_field.jpg'


export default class Field extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rotation: 0
        };

        this.rotate = this.rotate.bind(this);
    }

    fieldViewPort = {
        width: '100vh',
        height: '100vh',
        border: '3px solid black',
        float: 'left',
        backgroundColor: 'black',
    };
    fieldDivStyle = {
        width: '100vh',
        height: '100vh',
        float: 'left'
    };

    initScale = 0.4;

    rotate(){
        let newRotation = this.state.rotation + 90;
        if(newRotation >= 360){
            newRotation =- 360;
        }
        this.setState({
            rotation: newRotation,
        })
    }

    render() {
        const { rotation } =  this.state;
        return (
            <div style={this.fieldViewPort}>
                <TransformWrapper
                    defaultScale={this.initScale}
                    defaultPositionX={500}
                    defaultPositionY={500}

                    pan={{
                        velocity: false
                    }}
                    options={{
                        limitToWrapper: false,
                        limitToBounds: false,
                        minScale: this.initScale,
                        maxScale: 10,
                    }}
                >
                    <TransformComponent>
                        <div style={this.fieldDivStyle}>
                            <img src={field_img} onClick={this.rotate}/>
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        );
    }
}