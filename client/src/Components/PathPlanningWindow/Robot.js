import React, { Component } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import Constants from "../Constants";
import sleep from '../Utils'
class Robot extends React.Component {
    rbtOffset = (Constants.ROBOT_SIZE / 2);
    constructor(props) {
        super(props);
        this.state = {
            absoluteTheta: 0,
        }
    }
    travel = async () => {
        let waypoints = this.props.waypoints;
        let index = 0;
        while (index < waypoints.length - 1) {
            this.props.disablePreview()
            this.rect.to({
                x: waypoints[index],
                y: waypoints[index + 1],
                duration: Constants.PATH_RESOLUTION
            });
            let dy = waypoints[index + 3] - waypoints[index + 1];
            let dx = waypoints[index] - waypoints[index + 2];
            let theta = (180 * Math.atan2(dy, dx)) / Math.PI;
            theta = 90 - theta;
            this.state.absoluteTheta = theta - this.state.absoluteTheta;
            console.log("dy: %f dx %f", dy, dx);
            console.log("Theta: %f", theta);
            if (this.rect.x() !== waypoints[index] &&
                this.rect.y() !== waypoints[index + 1]) {
                await sleep(1000 * Constants.PATH_RESOLUTION);
            }
            //if (!isNaN(theta)) this.rect.rotate(this.state.absoluteTheta);
            this.props.enablePreview()
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
                x={this.props.robotx}
                y={this.props.roboty}
                visible={true}
                fill={this.props.robotFill}
                onClick={this.travel}
                onMouseEnter={this.props.drawingModeOff}
                onMouseLeave={this.props.drawingModeOn}
                opacity={this.props.opacity}
                offsetX={this.rbtOffset}
                offsetY={this.rbtOffset}
            />
        );
    }
}
export default Robot