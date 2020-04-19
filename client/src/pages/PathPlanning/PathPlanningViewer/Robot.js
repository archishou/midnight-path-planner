import React  from 'react';
import { Rect } from 'react-konva';
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
        this.rotateToAngle(0);
        this.setState({
            absoluteTheta: 0
        });
        this.props.disablePreview();
        let waypoints = this.props.waypoints;
        let index = 0;
        while (index < waypoints.length - 1) {
            this.rect.to({
                x: waypoints[index],
                y: waypoints[index + 1],
                duration: Constants.PATH_RESOLUTION
            });
            let dy = waypoints[index + 3] - waypoints[index + 1];
            let dx = waypoints[index] - waypoints[index + 2];
            let theta = (180 * Math.atan2(dy, dx)) / Math.PI;
            if (this.rect.x() !== waypoints[index] &&
                this.rect.y() !== waypoints[index + 1]) {
                await sleep(1000 * Constants.PATH_RESOLUTION);
            }
            this.rotateToAngle(theta);
            index += 2;
        }
        this.props.enablePreview();
    };
    rotateToAngle(angle) {
        if (isNaN(angle)) return;
        console.log("Absolute Theta %f", this.state.absoluteTheta);
        let theta = angle - this.state.absoluteTheta;
        this.rect.rotate(-theta);
        this.setState({
            absoluteTheta: theta + this.state.absoluteTheta
        });
    }
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