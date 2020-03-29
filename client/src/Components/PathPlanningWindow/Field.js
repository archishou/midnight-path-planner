import React from 'react';
import {Layer, Stage, Line, Image, Rect} from 'react-konva';
import useImage from 'use-image';
import Robot from './Robot'
import Constants from "../Constants";
import GetPoints from "../../HermiteCurveGenerator/Generator";
import Point from "../../HermiteCurveGenerator/Point"
const fieldImgURL = 'https://i.postimg.cc/XqTK09xY/field.png';
const fieldScale = 1.1;
const xOffset = 0;
const yOffset = 0;

const FieldImage = () => {
    const [image] = useImage(fieldImgURL);
    return <Image image={image} scaleX={fieldScale} scaleY={fieldScale}/>;
};

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mousepos: [],
            coordinates: [],
            drawingMode: false,
            robotFill: "grey"
        }
    }

    handleClick = (e) => {
        let p1 = new Point(0, 0);
        let p2 = new Point(50, 50);
        let p3 = new Point(70, 50);
        let knots = [p1, p2, p3];
        let points = GetPoints(knots);
        console.log("Here");
        console.log("Here");
        let str = "";
        points.forEach((p) => {
           str = str + "(" + p.x + ", " + p.y + "), ";
        });
        console.log(str);
        const eventX = e.evt.offsetX - xOffset;
        const eventY =  e.evt.offsetY - yOffset;
        if (this.state.drawingMode || this.state.coordinates.length === 0) {
            this.setState(({
                opacity: 1,
                coordinates: this.state.coordinates.concat(eventX, eventY),
                robotFill: "black"
            }));
        }
    };

    drawingModeOff = (e) => {
        this.setState({
            drawingMode: false
        });
    };

    drawingModeOn = (e) => {
        this.setState({
            drawingMode: true
        });
    };

    handleMouseMove = (e) => {
        const eventX = e.evt.offsetX - xOffset;
        const eventY =  e.evt.offsetY - yOffset;
        if (this.state.coordinates.length === 0) {
            this.setState({
                opacity: 0.5,
                drawingMode: true,
                roboty: eventY,
                robotx: eventX,
            });
        } else {
            if (this.state.drawingMode) {
                this.setState({
                    mousepos: [this.state.coordinates[this.state.coordinates.length - 2], this.state.coordinates[this.state.coordinates.length - 1], eventX, eventY]
                });
            } else {
                this.setState({
                    mousepos: []
                });
            }

        }
    };

    render() {
        return (
            <div className={"field-area"}>
                <Stage width={(4.8 * window.innerWidth) / 8} height={window.innerHeight}
                       onContentClick={this.handleClick}
                       onContentMouseMove={this.handleMouseMove}
                >
                    <Layer ref={
                        node => {
                            this.mainLayer = node;
                        }}>
                        <FieldImage/>
                        <Robot waypoints={this.state.coordinates}
                               robotx={this.state.robotx}
                               roboty={this.state.roboty}
                               robotFill={this.state.robotFill}
                               drawingModeOff={this.drawingModeOff}
                               drawingModeOn={this.drawingModeOn}
                               opacity={this.state.opacity}
                               layer={this.mainLayer}
                        />
                        <Line
                            points={this.state.coordinates}
                            tension={0}
                            stroke="black"
                            strokeWidth={4}
                        />
                        <Line
                            points={this.state.mousepos}
                            tension={1}
                            stroke="black"
                            strokeWidth={4}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}