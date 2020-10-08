import React from 'react';
import './Login.css';
import {Button,Form, Input,Checkbox} from 'antd';

function Login() {
    document.title = '登陆账号';

    return (
        <div className="loginContent">
            <div className="leftContent"/>
            <div className="rightSidebar">
                <div className="panel">
                    <div className="panelHeader">
                        <h2>登陆账号</h2>
                    </div>
                    <div className="panelBody">
                        <Form
                            name="loginForm"
                            layout="vertical"
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                label="账号"
                                name="username"
                                rules={[{ required: true, message: '请输入账号!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>记住账号</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="panelFooter">
                       Design by Fleey © { new Date().getFullYear()} Epay
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
