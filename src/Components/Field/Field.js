import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {Rectangle} from 'draw-shape-reactjs';
import './Field.css';
class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <TransformWrapper
                defaultScale={1}
                defaultPositionX={200}
                defaultPositionY={100}
                velocity={false}
            >
                <TransformComponent>
                    <img src="./resources/skystone_field.jpg" />
                    <div>Example text</div>
                </TransformComponent>
            </TransformWrapper>
        );
    }
}
export default Field;