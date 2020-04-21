import React from "react";
import {Card, Form, Input, Button} from "antd";
import routes from "../routes";
import { UserOutlined, LockOutlined, RobotOutlined } from '@ant-design/icons';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValidation: "",
            emailHelp: "",
            passwordValidation: "",
            passwordHelp: "",
            passwordValue: '',
            emailValue: '',
        }
    }

    handleSubmit = () => {
        // Set token into localstorage
        localStorage.setItem("token", "I am now logged in");
        this.props.history.push(routes.field);
    };

    onEmailChange = ({ target: { value } }) => {
        this.setState({
            emailValue: value,
        });
        if (this.state.emailValue === '') {
            this.setState({
                emailValidation: 'error',
                emailHelp: 'Email is required'
            })
        } else {
            this.setState({
                emailValidation: '',
                emailHelp: ''
            })
        }
        console.log("Email Value: " + this.state.emailValue)
    };

    onPasswordChange = ({ target: { value } }) => {
        this.setState({ value });
        console.log(this.state.value);
    };

    render() {
        return (
            <Card
                bordered={false}
                style={{
                    border: "1px solid #282828",
                    boxShadow: "0px 15px 20px 5px #0000001a",
                    width: 500,
                }}
                >
                <h1 style={{ textAlign: "center" }}>Midnight Path Planning</h1>
                <Form
                    hideRequiredMark
                    colon={false}
                    onSubmit={this.handleSubmit}
                    layout="vertical"
                    onChange={this.handleChange}
                    >
                    <Form.Item label="Email" rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="john@example.com" />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password
                        size="large"
                        type="password"
                        placeholder="Password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        onChange={this.onPasswordChange}/>
                    </Form.Item>
                    <Form.Item label="Robot Name">
                        <Input size="large" placeholder="Robot One" prefix={<RobotOutlined className="site-form-item-icon" />} />
                    </Form.Item>
                    <Form.Item>
                        <Button block htmlType="submit" size="large">Login</Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create({name: "Login"})(LoginPage);