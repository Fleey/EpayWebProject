import React from "react";
import {Button, Col, Image, Modal, Row, Spin, notification, Radio} from "antd";
import {checkQrCodeStatus, getLoginQrCode, saveQQAccountCookie} from "../../../api/tencentQQLogin";

import {LoadingOutlined} from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";

let callbackEvent = null

export class AddQQAccount extends React.Component {

    state = {
        loading: true,
        loadingTips: '加载中...',
        visible: false,
        qrsig: '',
        imgData: 'error',
        authorizationType: 'authorizationCode'
    }

    authorizationCodeInputRef = React.createRef()

    //定时器
    checkQrCodeIntervalHandel

    constructor(props) {
        super(props);

        callbackEvent = this.props.onFinish
    }

    startAddAccount = () => {
        this.setState({
            visible: true,
            loading: true,
        })

        console.log(this.authorizationTypeSelectRadio)
    }

    cancelAddAccount = () => {
        this.setState({
            visible: false,
            loading: false,
            loadingTips: '加载中...',
            qrsig: '',
            imgData: 'error'
        })

        clearInterval(this.checkQrCodeIntervalHandel)
    }

    getQQLoginQrCode = async () => {
        try {
            this.setState({loading: true, loadingTips: '加载中...'})

            let {data: {qrsig, imgData}} = await getLoginQrCode()

            this.setState({loading: false, qrsig: qrsig, imgData: `data:image/jpeg;base64,${imgData}`})

            clearInterval(this.checkQrCodeIntervalHandel)
            this.checkQrCodeIntervalHandel = setInterval(this.checkQrCodeStatus, 1000)
        } catch (e) {
            notification.error({
                message: '获取二维码发生错误',
                description: e.msg,
            })
        }
    }

    checkQrCodeStatus = async () => {
        let {qrsig} = this.state

        try {

            let {data: {status, msg}} = await checkQrCodeStatus({qrsig})

            switch (status) {
                case 5:
                    //二维码已经失效,需要刷新二维码
                    await this.getQQLoginQrCode()
                    break;
                case  4:
                    //正在验证二维码
                    this.setState({
                        loading: true,
                        loadingTips: "正在等待，手机确认二维码"
                    })
                    break;
                case 6:
                    //未知二维码报错
                    this.setState({
                        loading: true,
                        loadingTips: `发生错误：${msg}`
                    })
                    clearInterval(this.checkQrCodeIntervalHandel)
                    break;
                case 1:
                    //扫码成功
                    notification.success({
                        message: '扫码成功',
                        description: '已经成功添加一个QQ账号',
                    })
                    clearInterval(this.checkQrCodeIntervalHandel)
                    this.cancelAddAccount()
                    callbackEvent()
                    break;
                default:
                    break;
            }
        } catch (e) {
            if (e.code === 50000) {
                notification.error({
                    message: '检查二维码状态异常',
                    description: e.msg,
                })

                clearInterval(this.checkQrCodeIntervalHandel)
                this.cancelAddAccount()
            }
        }
    }

    authorizationTypeChange = async (e) => {
        let selectValue = 'authorizationCode'

        if (e) {
            selectValue = e.target.value
        } else {
            selectValue = 'authorizationCode'
        }

        this.setState({
            authorizationType: selectValue
        })

        if (selectValue === 'authorizationCode') {
            clearInterval(this.checkQrCodeIntervalHandel)
        } else {
            await this.getQQLoginQrCode()
        }
    }

    saveAuthorizationCode = async () => {
        let authorizationCode = this.authorizationCodeInputRef.current.resizableTextArea.textArea.value

        try {
            await saveQQAccountCookie({cookie: authorizationCode})

            notification.success({
                message: '保存成功',
                description: '已经成功添加一个QQ账号',
            })
            this.cancelAddAccount()
            callbackEvent()
        } catch (e) {
            notification.error({
                message: '保存失败',
                description: e.msg,
            })
        }
    }

    render() {
        let {visible, loading, loadingTips, imgData, authorizationType} = this.state

        return (
            <>
                <Modal
                    visible={visible}
                    title="添加QQ账号"
                    onCancel={this.cancelAddAccount}
                    footer={null}
                >
                    <Row justify="center" align="top" style={{marginBottom: "1rem"}}>
                        <Col>
                            <Radio.Group defaultValue={authorizationType}
                                         buttonStyle="solid"
                                         onChange={this.authorizationTypeChange}
                                         value={authorizationType}>
                                <Radio.Button value="authorizationCode">授权码添加</Radio.Button>
                                <Radio.Button value="qrcode">扫码添加</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>

                    <div style={{display: (authorizationType === 'authorizationCode' ? 'block' : 'none')}}>
                        <TextArea rows={4} placeholder="请输入 QQ登陆 授权码" ref={this.authorizationCodeInputRef}/>
                        <Row justify="end" align="top" style={{marginTop: "1rem"}}>
                            <Col>
                                <Button type="primary" onClick={this.saveAuthorizationCode}>提交</Button>
                            </Col>
                        </Row>
                    </div>

                    <div style={{display: (authorizationType === 'qrcode' ? 'block' : 'none')}}>
                        <p style={{textAlign: "center"}}>请使用手机QQ扫描下方二维码</p>
                        <Spin spinning={loading} tip={loadingTips}
                              indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}>
                            <Row justify="center" align="top">
                                <Col>
                                    <Image
                                        width={200}
                                        height={200}
                                        src={imgData}
                                        fallback="data:image/png;base64,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"
                                    />
                                </Col>
                            </Row>
                        </Spin>
                    </div>
                </Modal>

                <Button type="primary" onClick={this.startAddAccount}>添加QQ账号</Button>
            </>
        );
    }
}