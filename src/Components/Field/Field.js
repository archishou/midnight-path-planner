import React from 'react';
import { render } from 'react-dom';
// import R from 'ramda';
import Konva from 'konva';
import { Layer, Rect, Stage, Group, Image} from 'react-konva';
import useImage from 'use-image';

class ColoredRect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'green',
        };
        // so we can access props and state in handleClick
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // change color if not drawing mode
        if(!this.props.isDrawingMode) {
            this.setState({
                color: Konva.Util.getRandomColor(),
            })
        }
    }

    render() {
        return (
            <Group>
                <Rect
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height}
                    fill={this.state.color}
                    onClick={this.handleClick}m
                />
            </Group>
        );
    }
}

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shapes: [],           // list of dimensions to be rendered as shapes
            isDrawing: false,     // in the process of drawing a shape
            isDrawingMode: true,  // allow shapes to be drawn
        }
    }

    handleClick = (e) => {
        if (!this.state.isDrawingMode) return;
        // if we are drawing a shape, a click finishes the drawing
        if(this.state.isDrawing) {
            this.setState({
                isDrawing: !this.state.isDrawing,
            });
            return;
        }

        // otherwise, add a new rectangle at the mouse position with 0 width and height,
        // and set isDrawing to true
        const newShapes = this.state.shapes.slice();
        newShapes.push({
            x: e.evt.layerX,
            y: e.evt.layerY,
            width: 0,
            height: 0,
        });

        this.setState({
            isDrawing: true,
            shapes: newShapes,
        })
    };

    handleMouseMove= (e) => {
        if (!this.state.isDrawingMode) return;

        const mouseX = e.evt.layerX;
        const mouseY = e.evt.layerY;

        // update the current rectangle's width and height based on the mouse position
        if (this.state.isDrawing) {
            // get the current shape (the last shape in this.state.shapes)
            const currShapeIndex = this.state.shapes.length - 1;
            const currShape = this.state.shapes[currShapeIndex];
            const newWidth = mouseX - currShape.x;
            const newHeight = mouseY - currShape.y;

            const newShapesList = this.state.shapes.slice();
            newShapesList[currShapeIndex] = {
                x: currShape.x,   // keep starting position the same
                y: currShape.y,
                width: newWidth,  // new width and height
                height: newHeight
            };

            this.setState({
                shapes: newShapesList,
            });
        }
    };

    render() {

        return (
            <div className={"draw-area"}>
                <Stage width={window.innerWidth / 2} height={window.innerHeight}
                       onContentClick={this.handleClick}
                       onContentMouseMove={this.handleMouseMove}
                >
                    <Layer ref='layer'>
                        {
                            this.state.shapes.map(shape => {
                            return (
                                <ColoredRect
                                    x={shape.x}
                                    y={shape.y}
                                    width={shape.width}
                                    height={shape.height}
                                    isDrawingMode={this.state.isDrawingMode}
                                />
                            );
                        })}

                    </Layer>
                </Stage>
            </div>
        );
    }
}

