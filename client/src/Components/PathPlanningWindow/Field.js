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
            previewKnots: [],
            knots: [],
            drawingMode: false,
            robotFill: "grey",
            waypoints: [],
        }
    }

    handleClick = (e) => {
        const eventX = e.evt.offsetX - xOffset;
        const eventY =  e.evt.offsetY - yOffset;
        if (this.state.drawingMode || this.state.knots.length === 0) {
            this.setState(({
                opacity: 1,
                knots: this.state.knots.concat(eventX, eventY),
                robotFill: "black"
            }));
        }
        if (this.state.knots.length > 2) {
            this.setState(({
                waypoints: this.getWayPoints(this.state.knots)
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

    getWayPoints(knotsInput) {
        let knots = [];
        let updatedWaypoints = [];
        let size = knotsInput.length;
        let index = 0;
        while (index < size) {
            knots.push(new Point(knotsInput[index], knotsInput[index + 1]));
            index = index + 2;
        }

        let points = GetPoints(knots);

        size = points.length;
        index = 0;
        while (index < size) {
            updatedWaypoints.push(points[index].x, points[index].y);
            index++
        }

        return updatedWaypoints
    }

    handleMouseMove = (e) => {
        const eventX = e.evt.offsetX - xOffset;
        const eventY =  e.evt.offsetY - yOffset;
        if (this.state.knots.length === 0) {
            this.setState({
                opacity: 0.5,
                drawingMode: true,
                roboty: eventY,
                robotx: eventX,
            });
        } else {
            let previewWaypoints = this.state.knots.concat(eventX, eventY);
            if (this.state.drawingMode && previewWaypoints.length > 2) {
                this.setState({
                    previewKnots: this.getWayPoints(previewWaypoints)
                });
            } else {
                this.setState({
                    previewKnots: []
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
                        <Line
                            points={this.state.knots}
                            tension={0}
                            stroke="red"
                            strokeWidth={4}
                            opacity={0.25}
                        />
                        <Line
                            points={this.state.previewKnots}
                            tension={1}
                            stroke="black"
                            strokeWidth={4}
                        />
                        <Line
                            points={this.state.waypoints}
                            tension={0}
                            stroke="green"
                            strokeWidth={4}
                            opacity={0.5}
                        />
                        <Robot waypoints={this.state.waypoints}
                               robotx={this.state.robotx}
                               roboty={this.state.roboty}
                               robotFill={this.state.robotFill}
                               drawingModeOff={this.drawingModeOff}
                               drawingModeOn={this.drawingModeOn}
                               opacity={this.state.opacity}
                               layer={this.mainLayer}
                        />

                    </Layer>
                </Stage>
            </div>
        );
    }
}