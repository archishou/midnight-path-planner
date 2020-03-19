import React from 'react';
import { Layer, Stage, Line, Image} from 'react-konva';
import useImage from 'use-image';

const fieldImgURL = 'https://i.postimg.cc/XqTK09xY/field.png';
const fieldScale = 0.8;
const xOffset = window.innerWidth / 8;
const yOffset = 10;

const FieldImage = () => {
    const [image] = useImage(fieldImgURL);
    return <Image image={image} scaleX={fieldScale} scaleY={fieldScale}/>;
};

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [],
        }
    }

    handleClick = (e) => {
        this.setState(({
            coordinates: this.state.coordinates.concat(e.evt.offsetX - xOffset, e.evt.offsetY - yOffset),
        }));
        console.log("Coordinates: %s", this.state.coordinates.toString());
    };

    handleMouseMove= (e) => {

    };

    render() {

        return (
            <div >
                <Stage width={(5 * window.innerWidth) / 8} height={window.innerHeight} x={xOffset} y={yOffset}
                       onContentClick={this.handleClick}
                       onContentMouseMove={this.handleMouseMove}
                >
                    <Layer ref='layer'>
                        <FieldImage/>
                        <Line
                            points={this.state.coordinates}
                            tension={0.4}
                            stroke="black"
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}