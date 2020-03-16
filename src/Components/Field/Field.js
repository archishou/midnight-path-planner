import React from 'react';
import './Field.css'
import Immutable from "immutable";
import Konva from 'konva';

import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';



export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waypoints: new Immutable.List(),
            isDrawing: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseDown(mouseEvent) {
        if (mouseEvent.button != 0) {
            return;
        }

        const point = this.relativeCoordinatesForEvent(mouseEvent);

        this.setState(prevState => ({
            waypoints: prevState.waypoints.push(new Immutable.List([point])),
            isDrawing: true
        }));

        this.setState(prevState =>  ({
            waypoints: prevState.waypoints.updateIn([prevState.waypoints.size - 1], line => line.push(point))
        }));
    }

    handleMouseUp() {
        this.setState({ isDrawing: false });
    }

    relativeCoordinatesForEvent(mouseEvent) {
        const boundingRect = this.refs.drawArea.getBoundingClientRect();
        return new Immutable.Map({
            x: mouseEvent.clientX - boundingRect.left,
            y: mouseEvent.clientY - boundingRect.top,
        });
    }

    render() {
        return (
            <div
                className="drawArea"
                ref="drawArea"
                onMouseDown={this.handleMouseDown}
            >
                <Drawing lines={this.state.waypoints} />
            </div>
        );
    }
}

function Drawing({ lines }) {
    return (
        <svg className="drawing">
            {
                lines.map((line, index) => (
                <DrawingLine key={index} line={line} />
            ))}
        </svg>
    );
}

function DrawingLine({ line }) {
    const pathData = "M " +
        line
            .map(p => {
                return `${p.get('x')} ${p.get('y')}`;
            })
            .join(" L ");

    return <path className="path" d={pathData} />;
}
