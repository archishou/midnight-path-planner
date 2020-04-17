import React, { Component } from "react";
import { Form,Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import Bootstrap from "react-bootstrap";
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
                <img src={logoUrl} alt="Logo"/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <br/>
                        <input type="text" value={this.state.value} onChange={this.handleUsernameChange} />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <br/>
                        <input type="password" value={this.state.value} onChange={this.handlePasswordChange} />
                    </label>
                    <br/>
                    <label>
                        Robot Name:
                        <br/>
                        <input type="text" value={this.state.value} onChange={this.handleRobotNameChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}