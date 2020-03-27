import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect } from 'react-konva';
import Constants from "../Constants";
import sleep from '../Utils'
class Robot extends React.Component {
    rbtOffset = (Constants.ROBOT_SIZE / 2);
    constructor(props) {
        super(props);
    }
    travel = async () => {
        let waypoints = this.props.waypoints;
        let index = 0;
        while (index < waypoints.length - 1) {
            this.rect.to({
                x: waypoints[index] - this.rbtOffset,
                y: waypoints[index + 1] - this.rbtOffset,
                duration: 1
            });
            if (this.rect.x() !== waypoints[index] - this.rbtOffset &&
                this.rect.y() !== waypoints[index + 1] - this.rbtOffset) {
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
                x={this.props.robotx - this.rbtOffset}
                y={this.props.roboty - this.rbtOffset}
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