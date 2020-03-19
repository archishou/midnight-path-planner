import React from 'react';
import { Layer, Stage, Line} from 'react-konva';



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
                        <Line
                            points={this.state.coordinates}
                            tension={0}
                            stroke="black"
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}

