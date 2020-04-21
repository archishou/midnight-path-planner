import React from "react";
import {Card, Form, Input, Button} from "antd";
import routes from "../routes";
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValidation: "",
            emailHelp: "",
            passwordValidation: "",
            passwordHelp: "",
        }
    }
    handleSubmit = () => {
        // Set token into localstorage
        localStorage.setItem("token", "I am now logged in");
        this.props.history.push(routes.field);
    };
    handleChange = () => {

    };
    render() {
        return (
            <Card
                bordered={false}
                style={{
                border: "1px solid #282828",
                boxShadow: "0px 15px 20px 5px #0000001a",
                width: 500,
                //backgroundColor: "grey",
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
                    <Form.Item label="Email" rules={[{ required: true, message: "Email required" }]} validateStatus="success" help="">
                        <Input size="large" placeholder="john@example.com" />
                    </Form.Item>
                    <Form.Item label="Password" rules={[{ required: true, message: "Password required" }]}>
                        <Input.Password
                        size="large"
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item label="Robot Name">
                        <Input size="large" placeholder="Robot One" />
                    </Form.Item>
                    <Form.Item>
                        <Button block htmlType="submit" size="large">
                        Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create({name: "Login"})(LoginPage);