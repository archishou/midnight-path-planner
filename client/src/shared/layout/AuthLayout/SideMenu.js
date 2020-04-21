import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
} from '@ant-design/icons';
import Constants from "../../../pages/PathPlanning/Constants";
import './AuthLayout.css'

export default class SideMenu extends React.Component {
    render() {
        return (
            <div style={{ width: 256, marginTop: Constants.HEADER_HEIGHT }} className={"side-menu"}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <PieChartOutlined />
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <DesktopOutlined />
                        <span>Option 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <ContainerOutlined />
                        <span>Option 3</span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}