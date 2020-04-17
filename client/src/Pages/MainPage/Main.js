import React, {Component} from "react"
import './Main.css'

export default class Main extends Component {
    s = {
        color: "white"
    };
    render() {
        return (
            <div className="main">
                {this.props.children}
            </div>
        );
    }

}