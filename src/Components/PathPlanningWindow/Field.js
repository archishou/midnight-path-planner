import React from 'react';
import {Layer, Stage, Line, Image, Rect} from 'react-konva';
import useImage from 'use-image';
import Robot from './Robot'
import Constants from "../Constants";
const fieldImgURL = 'https://i.postimg.cc/XqTK09xY/field.png';
const fieldScale = 1.2;
const xOffset = window.innerWidth / 8;
const yOffset = 10;

const FieldImage = () => {
    const [image] = useImage(fieldImgURL);
    return <Image image={image} scaleX={fieldScale} scaleY={fieldScale}/>;
};

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [],
            initX: 0,
            initY: 0,
            robotVisible: false,
        }
    }

    handleClick = (e) => {
        const eventX = e.evt.offsetX - xOffset;
        const eventY =  e.evt.offsetY - yOffset;
        if (this.state.coordinates.length === 0) {
            this.setState(({
                initX: eventX - (Constants.ROBOT_SIZE / 2),
                initY: eventY - (Constants.ROBOT_SIZE / 2),
                robotVisible: true,
                coordinates: this.state.coordinates.concat(eventX, eventY),
            }));
        }
        if (!this.robotClicked(eventX, eventY)) {
            this.setState(({
                coordinates: this.state.coordinates.concat(eventX, eventY),
            }));
        }
    };

    handleMouseMove = (e) => {

    };

    robotClicked(eventX, eventY) {
        console.log("EventX: %d EventY: %d", eventX, eventY);
        let x1 = eventX <= this.state.coordinates[0] + (Constants.ROBOT_SIZE / 2);
        let x2 = eventX >= this.state.coordinates[0] - (Constants.ROBOT_SIZE / 2);

        let y1 = eventY <= this.state.coordinates[1] + (Constants.ROBOT_SIZE / 2);
        let y2 = eventY >= this.state.coordinates[1] - (Constants.ROBOT_SIZE / 2);
        console.log("x1: &b, x2: %b, y1: %b, y2: %b", x1, x2, y1, y2);
        if (x1 && x2 && y1 && y2) {
            console.log("Clicked");
            return true;
        }
    }

    render() {
        return (
            <div id={"field-area"}>
                <Stage width={(5 * window.innerWidth) / 8} height={window.innerHeight} x={xOffset} y={yOffset}
                       onContentClick={this.handleClick}
                       onContentMouseMove={this.handleMouseMove}
                >
                    <Layer ref='layer'>
                        <FieldImage/>
                        <Robot waypoints={this.state.coordinates}
                               initX={this.state.initX} initY={this.state.initY}
                               robotVisible={this.state.robotVisible}
                        />
                        <Line
                            points={this.state.coordinates}
                            tension={0.4}
                            stroke="black"
                            strokeWidth={4}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}