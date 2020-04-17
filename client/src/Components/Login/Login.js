import React, { Component } from "react";
import { Form,Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import Bootstrap from "react-bootstrap";
import M from "materialize-css";


const logoUrl = 'https://i.postimg.cc/WbzwhV5B/midnight-logo.png';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            robotName: ''
        };
    }
    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handleRobotNameChange = (event) => {
        this.setState({
            robotName: event.target.value
        });
    };

    handleSubmit = (event) => {
        alert('User ' + this.state.username + '\nPassword ' + this.state.password + '\nRobot Name ' + this.state.robotName);
        event.preventDefault();
    };

    render() {
        return (
            <div className="login">
                <img className={"logo"} src={logoUrl} alt="Logo"/>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input id="username" type="text" className="validate" value={this.state.username} onChange={this.handleUsernameChange}/>
                        <label htmlFor="username">Username</label>
                        <input id="password" type="password" className="validate" value={this.state.password} onChange={this.handlePasswordChange}/>
                        <label htmlFor="password">Password</label>
                        <input id="robot-name" type="text" className="validate" value={this.state.robotName} onChange={this.handleRobotNameChange}/>
                        <label htmlFor="robot-name">Robot Name</label>
                    </div>
                </form>
            </div>
        );
    }
}