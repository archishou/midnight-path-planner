import React from 'react';
import {Layer, Stage, Line, Image as KonvaImage} from 'react-konva';
import useImage from 'use-image';
import Robot from './Robot'
import GetPoints from "../../HermiteCurveGenerator/Generator";
import Point from "../../HermiteCurveGenerator/Point"
import Constants from "../Constants";
const fieldImgURL = 'https://i.postimg.cc/XqTK09xY/field.png';
const fieldScale = 1.23;
let yOffset = 0;

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewKnots: [],
            knots: [],
            drawingMode: false,
            robotFill: "grey",
            waypoints: [],
            showPreview: true,
        }
    }

    handleClick = (e) => {
        const eventX = e.evt.offsetX;
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

    handleMouseMove = (e) => {
        if (this.state.showPreview) {
            const eventX = e.evt.offsetX;
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

    enablePreview = (e) => {
        this.setState({
            showPreview: true
        });
    };

    disablePreview = (e) => {
        this.setState({
            showPreview: false
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

    render() {
        return (
            <div className={"field-area"}>
                <Stage width={Constants.FIELD_DIMENSIONS * fieldScale} height={Constants.FIELD_DIMENSIONS * fieldScale}
                       y={(window.innerHeight - (Constants.FIELD_DIMENSIONS * fieldScale)) / 2}
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
                            visible={this.state.showPreview}
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
                               enablePreview={this.enablePreview}
                               disablePreview={this.disablePreview}
                        />

                    </Layer>
                </Stage>
            </div>
        );
    }
}

const FieldImage = () => {
    const [image] = useImage(fieldImgURL);
    return <KonvaImage image={image} scaleX={fieldScale} scaleY={fieldScale}/>;
};