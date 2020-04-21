import React from "react";
import { message, Row, Layout, Button, Dropdown, Icon, Menu, Col } from "antd";
import routes from "../../../routes";
import './AuthLayout.css'
import Constants from "../../../pages/PathPlanning/Constants";
const MenuItemWidth = 3;
const MenuItemCount = 3;
const LoginPadding = 24 - ((MenuItemCount + 1) * MenuItemWidth);
const { Header, Content } = Layout;

class AuthLayout extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      // User is not logged in. Redirect back to login
      this.props.history.push(routes.login);
      message.warning("Please login first");
      return;
    }
    // Fetch data for logged in user using token
  }

  onLogout = () => {
    // Remove token & other stored data
    localStorage.clear();
    this.props.history.push(routes.login);
  };

  render() {
    return (
      <Layout className={"main-layout"}>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "#282828"
          }}
        >

          <Row
            type="flex"
            align="middle"
            style={{ height: "100%" }}
          >
            <Col className="gutter-row" span={MenuItemWidth}>
               <Button ghost className="primary-btn" justify="end">Path Planning Tools</Button>
            </Col>
            <Col className="gutter-row" span={MenuItemWidth}>
                <Button ghost className="primary-btn" justify="end">Graphing Tool</Button>
            </Col>
            <Col className="gutter-row" span={MenuItemWidth}>
                <Button ghost className="primary-btn" justify="end">Command Line Tool</Button>
            </Col>
            <Col className="gutter-row" span={MenuItemWidth} offset={LoginPadding}>
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="1" onClick={this.onLogout}>
                                <Icon type="logout" />
                                 Logout
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={["click"]}
                >
                    <Button ghost className="primary-btn">
                        user@gmail.com <Icon type="down" />
                    </Button>
                </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content style={{height: window.innerHeight - Constants.HEADER_HEIGHT, margin: "0 auto", marginTop: Constants.HEADER_HEIGHT}}>
            {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default AuthLayout;
