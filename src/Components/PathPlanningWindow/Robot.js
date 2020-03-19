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
        const waypoints = this.props.waypoints;
        let index = 0;
        while (index < waypoints.length - 1) {
            this.rect.to({
                x: waypoints[index] - (Constants.ROBOT_SIZE / 2),
                y: waypoints[index + 1] - (Constants.ROBOT_SIZE / 2),
                duration: 1
            });
            if (index !== 0) await sleep(1000);
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
                x={this.props.initX}
                y={this.props.initY}
                visible={this.props.robotVisible}
                fill="black"
                onClick={this.travel}
            />
        );
    }
}
export default Robot