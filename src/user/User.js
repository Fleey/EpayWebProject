import React from 'react'
import Sidebar from "./sidebar/Sidebar";

import './User.css';

import {Layout, Menu, Breadcrumb} from 'antd';
import {Router, Route, hashHistory} from 'react-router'
import DashBoardPage from "./dashboard/DashBoardPage";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import OrderList from "./orderList/OrderList";


const {Header, Content, Footer, Sider} = Layout;


const routes = (
    <Route path="User">
        <Route path="Dashboard" component={DashBoardPage}/>
        <Route path="OrderList" component={OrderList}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);


class User extends React.Component {

    renderBreadCrumb() {
        let itemLayer = [
            '用户中心'
        ];

        let pathname = this.props.location.pathname;

        global.user.menus.map(item => {
            if (item.subs && item.subs.length > 0) {
                //二级菜单

                item.subs && item.subs.map(subItem => {
                    if (subItem.key === pathname) {
                        itemLayer.push(item.title, subItem.title);
                    }
                });

            } else {
                //一级菜单
                if (item.key === pathname) {
                    itemLayer.push(item.title);
                }
            }
        });

        return (
            <Breadcrumb style={{margin: '16px 0'}}>
                {
                    itemLayer.map(item => {
                        return <Breadcrumb.Item>{item}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        );
    }

    render() {

        return (
            <Layout className="userLayout">
                <Header className="header">
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">首页</Menu.Item>
                        <Menu.Item key="2">用户中心</Menu.Item>
                        <Menu.Item key="3">API 文档</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>

                    {/*渲染路径栏*/}
                    {this.renderBreadCrumb()}
                    {/*渲染路径栏*/}

                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Sidebar pathname={this.props.location.pathname}/>
                        </Sider>

                        {/*Content start*/}
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Router history={hashHistory} routes={routes}/>
                        </Content>
                        {/*contentMain end*/}
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Design by Fleey © {new Date().getFullYear()} Epay </Footer>
            </Layout>
        );
    }
}


export default User;