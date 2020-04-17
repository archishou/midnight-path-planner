import React, { Component } from "react";
import { Form,Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import Bootstrap from "react-bootstrap";
import M from "materialize-css";

const logoUrl = 'https://i.postimg.cc/WbzwhV5B/midnight-logo.png';

const loginStyle = {
    color: "black"
};

const inputStyle = {
    color: "white"
}

const mainDiv = {
    backgroundColor: "black",
    width: "100vw"
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            robotName: '',
            loginDisabled: "disabled"
        };
    }
    componentDidMount() {
        M.AutoInit();
    }

    updateLoginButtonState() {
        if (this.state.username === '' || this.state.password === '' || this.state.robotName === '') {
            this.setState({
                loginDisabled: "disabled"
            })
        } else {
            this.setState({
                loginDisabled: ""
            })
        }
        console.log(this.state.loginDisabled)
    }

    handleUsernameChange = (event) => {
        this.updateLoginButtonState();
        this.setState({
            username: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        this.updateLoginButtonState();
        this.setState({
            password: event.target.value
        });
    };

    handleRobotNameChange = (event) => {
        this.updateLoginButtonState();
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
                    <div className="row">
                        <div className="input-field col s4 push-s4">
                            <input id="username" type="text" className="validate" style={inputStyle} value={this.state.username} onChange={this.handleUsernameChange}/>
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4 push-s4">
                            <input id="password" type="password" className="validate" style={inputStyle} value={this.state.password} onChange={this.handlePasswordChange}/>
                                <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4 push-s4">
                            <input id="robot-name" type="text" className="validate" style={inputStyle} value={this.state.robotName} onChange={this.handleRobotNameChange}/>
                                <label htmlFor="robot-name">Robot Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <a className={"waves-effect waves-black push-s4 btn-large white " + this.state.loginDisabled + " col s4 push-s4"} style={loginStyle}>Login</a>
                    </div>
                </form>
            </div>
        );
    }
}