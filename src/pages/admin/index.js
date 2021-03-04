import React from 'react'
import Sidebar from "./siderbar/siderbar"

import './index.css'
import './siderbar/menus'

import {Layout, Menu, Breadcrumb} from 'antd'
import {Route,Switch} from 'react-router-dom'

import Dashboard from "./dashboard/dashboard"
import OrderList from "./orderList/orderList"
import NotFoundPage from "../404/404";

const {Header, Content, Footer, Sider} = Layout;


const routes = (
    <Switch>
        <Route path="/admin/dashboard" component={Dashboard} exact={true}/>
        <Route path="/admin/orderList" component={OrderList} exact={true}/>
        <Route path="/admin/*" component={NotFoundPage} exact={true}/>
    </Switch>
);


class User extends React.Component {

    renderBreadCrumb() {
        let itemLayer = [
            '管理后台'
        ];

        let pathname = this.props.location.pathname;

        global.user.menus.forEach(item => {
            if (item.subs && item.subs.length > 0) {
                //二级菜单

                item.subs && item.subs.forEach(subItem => {
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
                        <Menu.Item key="2">管理后台</Menu.Item>
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
                            {routes}
                        </Content>
                        {/*contentMain end*/}
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Design by {process.env.APP_AUTHOR} © {new Date().getFullYear()} {process.env.APP_NAME}
                </Footer>
            </Layout>
        );
    }
}


export default User;