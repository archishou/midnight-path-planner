import React from "react";
import { Card, Form, Input, Button } from "antd";
import routes from "../routes";
import { UserOutlined, LockOutlined, RobotOutlined } from '@ant-design/icons';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleSubmit = () => {
        // Set token into localstorage
        localStorage.setItem("token", "I am now logged in");
        this.props.history.push(routes.field);
    };

    onPasswordChange = ({ target: { value } }) => {
        this.setState({ value });
        console.log(this.state.value);
    };

    render() {
        return (
            <Card
                style={{
                    border: "10px solid #282828",
                    boxShadow: "0px 15px 20px 5px #0000001a",
                    width: 500,
                }}
                >
                <h1 style={{ textAlign: "center" }}>Midnight Path Planning</h1>
                <Form
                    hideRequiredMark
                    colon={false}
                    layout="vertical"
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
                        <Button block htmlType="submit" size="large" onClick={this.handleSubmit}>Login</Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

}