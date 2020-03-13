import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
    Rectangle
} from 'draw-shape-reactjs';
class Clock extends React.Component {
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
            <TransformWrapper>
                <TransformComponent>
                    <img src="image.jpg" alt="test" />
                </TransformComponent>
            </TransformWrapper>
        );
    }
}

export default Clock;