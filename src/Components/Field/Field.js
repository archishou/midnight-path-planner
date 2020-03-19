import React from 'react';
import { Layer, Stage, Line, Shape, Image} from 'react-konva';
import useImage from 'use-image';

const fieldImgURL = 'https://i.postimg.cc/XqTK09xY/field.png';
const fieldScale = 0.8;
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
            coordinates: this.state.coordinates.concat(e.evt.layerX, e.evt.layerY),
        }));
        console.log("State");
        console.log(this.state.coordinates);
    };

    handleMouseMove= (e) => {

    };



    render() {

        return (
            <div className={"draw-area"}>
                <Stage width={window.innerWidth / 2} height={window.innerHeight}
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

