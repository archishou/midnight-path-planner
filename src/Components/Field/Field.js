import React from 'react';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import './Field.css'
import field_img from './resources/skystone_field.jpg'
import Immutable from "immutable";
const fieldViewHeight = '90vh';
const fieldViewWidth = '50vw';

const DrawingLine = (props) => {
    const pathData = "M " + props.line
        .map(p => {
            return `${p.get('x')} ${p.get('y')}`
        })
        .join(" L ");
    console.log("in DrawingLine", pathData);
    return <path className="path" d={pathData} />;
};

export default class Field extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDrawing: false,
            lines: new Immutable.List()
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    state = {
        isDrawing: false,
        lines: new Immutable.List()
    };

    relativeCoordinatesForEvent(event) {
        const boundingRect = this.refs.drawArea.getBoundingClientRect();

        return new Immutable.Map({
            x: event.clientX - boundingRect.left,
            y: event.clientY - boundingRect.top,
        });
    }
    handleMouseDown = (event) => {
        if (event.button !== 0) return;
        const point = this.relativeCoordinatesForEvent(event);
        this.setState(prevState => {
            return {
                lines: prevState.lines.push(new Immutable.List([point])),
                isDrawing: true,
            }
        })
    };

    handleMouseMove = (event) => {
        if (!this.state.isDrawing) {
            return;
        }
        const point = this.relativeCoordinatesForEvent(event);
        this.setState(prevState =>  ({
            lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
        }));
    };


    Drawing = (props) => {
        return(
            <svg className="drawing">
                {props.lines.map((line, index) => (
                    <DrawingLine key={index} line={line} />
                ))}
            </svg>
        )
    };



    fieldDivStyle = {
        width: fieldViewWidth,
        height: fieldViewHeight,
        float: 'left'
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
                    <div style={this.fieldDivStyle} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove}>
                        <img src={field_img}/>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        );
    }
}