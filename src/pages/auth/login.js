import React from 'react';
import './style/login.css';
import {Button, Form, Input, Checkbox, message} from 'antd';


import {getRememberUsername, setRememberUsername, setAuthInfo} from '../../models/auth/userAuth'
import {apiLogin} from "../../api/auth";

class Login extends React.Component {
    loginFormRef = React.createRef()

    constructor(props) {
        super(props);
        this.state = {
            initLoginUsername: getRememberUsername(),
            isLoginLoading: false
        }
    }

    loginSubmit = async (values) => {

        if (values['remember']) {
            setRememberUsername(values['username'])
        } else {
            setRememberUsername('')
        }

        try {
            this.setState({isLoginLoading: true})

            let {data: {token, userid, expiredTime}} = await apiLogin({
                username: values['username'],
                password: values['password']
            })

            //设置登陆信息
            setAuthInfo(userid, token, expiredTime)


            setTimeout(() => {
                window.location.href = '/admin/dashboard'
            }, 1000);

            message.success('登陆成功，即将跳转至后台')
        } catch (e) {
            message.error(e.msg)
            //清空密码
            this.loginFormRef.current.setFieldsValue({
                password: '',
            });
        } finally {
            this.setState({isLoginLoading: false})
        }

    }

    render() {
        document.title = '登陆账号';
        this.loginFormRef = React.createRef()
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
                                onFinish={this.loginSubmit}
                                ref={this.loginFormRef}
                                initialValues={{remember: true}}
                            >
                                <Form.Item
                                    label="账号"
                                    name="username"
                                    initialValue={this.state.initLoginUsername}
                                    rules={[{required: true, message: '请输入账号!'}]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[{required: true, message: '请输入密码!'}]}
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>记住账号</Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={this.state.isLoginLoading} block>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="panelFooter">
                            Design by {process.env.APP_AUTHOR} © {new Date().getFullYear()} {process.env.APP_NAME}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
