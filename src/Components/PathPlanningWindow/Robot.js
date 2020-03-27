import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect } from 'react-konva';
import Constants from "../Constants";
import sleep from '../Utils'
class Robot extends React.Component {

    constructor(props) {
        super(props);
    }
    travel = async () => {
        let waypoints = this.props.waypoints;
        let index = 0;
        while (index < waypoints.length - 1) {
            this.rect.to({
                x: waypoints[index] - (Constants.ROBOT_SIZE / 2),
                y: waypoints[index + 1] - (Constants.ROBOT_SIZE / 2),
                duration: 1
            });
            if (this.rect.x() !== waypoints[index] - (Constants.ROBOT_SIZE / 2) &&
                this.rect.y() !== waypoints[index + 1] - (Constants.ROBOT_SIZE / 2)) {
                await sleep(1000);
            }
            index += 2;
        }
    };
    render() {
        return (
            <Rect
                ref={node => {
                    this.rect = node;
                }}
                width={Constants.ROBOT_SIZE}
                height={Constants.ROBOT_SIZE}
                x={this.props.robotx - (Constants.ROBOT_SIZE / 2)}
                y={this.props.roboty - (Constants.ROBOT_SIZE / 2)}
                visible={true}
                fill={this.props.robotFill}
                onClick={this.travel}
                onMouseEnter={this.props.drawingModeOff}
                onMouseLeave={this.props.drawingModeOn}
                opacity={this.props.opacity}
            />
        );
    }
}
export default Robot