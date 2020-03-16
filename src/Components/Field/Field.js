import React from 'react';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import './Field.css'
import field_img from './resources/skystone_field.jpg'
import Immutable from "immutable";


export default class Field extends React.Component {

    fieldDivStyle = {
        width: '50vw',
        height: '90vh',
        float: 'left',
        border: '3px solid red',
    };

    initScale = 0.4;

    render() {
        return (
            <TransformWrapper
                defaultScale={this.initScale}
                defaultPositionX={0}
                defaultPositionY={0}

                pan={{
                    velocity: false
                }}
                options={{
                    limitToWrapper: false,
                    limitToBounds: false,
                    minScale: this.initScale,
                    maxScale: 10,
                }}
            >
                <TransformComponent>
                    <div style={this.fieldDivStyle} >
                        <img src={field_img}/>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        );
    }
}

/*
 <Drawing lines={this.state.lines} />



constructor(props) {
    super(props);
    this.state = {
        lines: new Immutable.List(),
        isDrawing: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
}

initScale = 0.4;

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
        lines: prevState.lines.push(new Immutable.List([point])),
        isDrawing: true
    }));
}

handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
        return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState =>  ({
        lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));
}

handleMouseUp() {
    this.setState({ isDrawing: false });
}

relativeCoordinatesForEvent(mouseEvent) {
    //const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Immutable.Map({
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
    });
}


function Drawing({ lines }) {
    return (
        <svg className="drawing">
            {lines.map((line, index) => (
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
 */