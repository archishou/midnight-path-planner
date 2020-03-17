import React from 'react';
import './Field.css'
import Immutable from "immutable";

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waypoints: new Immutable.List(),
            isDrawing: false,
            hover: false,
            previousMouseX: 0,
            previousMouseY: 0,
            previousWayPointX: 0,
            previousWayPointY: 0,
            initalWaypointDrawn: false,
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove(this);
        this.toggleHover = this.toggleHover.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseDown(mouseEvent) {
        if (mouseEvent.button !== 0) return

        const point = this.relativeCoordinatesForEvent(mouseEvent);

        if (this.state.initalWaypointDrawn === false) {
            this.setState(({
                initalWaypointDrawn: true,
            }));
        }

        this.setState(prevState => ({
            waypoints: prevState.waypoints.push(new Immutable.List([point])),
            isDrawing: true
        }));

        this.setState(prevState =>  ({
            waypoints: prevState.waypoints.updateIn([prevState.waypoints.size - 1], line => line.push(point)),
            previousWayPointX: point.get('x'),
            previousWayPointY: point.get('y'),
        }));
    }

    handleMouseMove(event) {
        this.setState(({
            previousMouseX: event.offsetX,
            previousMouseY: event.offsetY,
        }));

        const point = this.relativeCoordinatesForEvent(event);

        if (this.state.initalWaypointDrawn) {
            this.setState(prevState => ({
                waypoints: prevState.waypoints.push(new Immutable.List([point])),
                isDrawing: true
            }));
            this.setState(prevState =>  ({
                waypoints: prevState.waypoints.updateIn([prevState.waypoints.size - 1], line => line.push(point)),
            }));
        }
    }

    handleMouseUp() {
        this.setState({ isDrawing: false });
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }

    relativeCoordinatesForEvent(mouseEvent) {
        const boundingRect = this.refs.drawArea.getBoundingClientRect();
        return new Immutable.Map({
            x: mouseEvent.clientX - boundingRect.left,
            y: mouseEvent.clientY - boundingRect.top,
        });
    }

    render() {
        let hover;
        if (this.state.hover) {
            hover = 'hover'
        } else {
            hover = 'no-hover'
        }
        return (
            <div
                className={`draw-area-${hover}`}
                ref="drawArea"
                onMouseDown={this.handleMouseDown}
            >
                <svg className="drawing"
                     >{
                        this.state.waypoints.map((line, index) => (
                            <DrawingLine
                                key={index}
                                line={line}
                                enter={this.toggleHover}
                                leave={this.toggleHover}
                            />
                        ))}
                </svg>
            </div>
        );
    }
}

function DrawingLine({ line , enter, leave}) {
    const pathData = "M " +
        line
            .map(p => {
                return `${p.get('x')} ${p.get('y')}`;
            })
            .join(" L ");

    return <path className="path" d={pathData} onMouseLeave={leave} onMouseEnter={enter}/>;
}
