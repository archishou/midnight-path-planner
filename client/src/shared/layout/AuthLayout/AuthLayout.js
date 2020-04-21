import React from "react";
import { message, Layout, Menu } from "antd";
import routes from "../../../routes";
import './AuthLayout.css'
import Constants from "../../../pages/PathPlanning/Constants";
const { Content } = Layout;
const { SubMenu } = Menu;
class AuthLayout extends React.Component {

    state = {
        current: 'mail',
    };

    componentDidMount() {
        if (!localStorage.getItem("token")) {
          this.props.history.push(routes.login);
          message.warning("Please login first");
        }
    }

    onLogout = () => {
    localStorage.clear();
    this.props.history.push(routes.login);
    };

    render() {
    return (
        <Layout className={"main-layout"}>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                <Menu.Item key="path">Path Planning Tool</Menu.Item>
                <Menu.Item key="graph">Graphing Tool</Menu.Item>
                <Menu.Item key="command">Command Line Tools</Menu.Item>
                <SubMenu title={<>user@gmail.com</>}>
                    <Menu.Item key="setting:3" onClick={this.onLogout}>Logout</Menu.Item>
                </SubMenu>
            </Menu>
            <Content style={{height: window.innerHeight - Constants.HEADER_HEIGHT, margin: "0 auto"}}>
                {this.props.children}
            </Content>
      </Layout>
    );
    }
}

export default AuthLayout;
