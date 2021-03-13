import React from "react";
import {Button, Col, message, Modal, Row, Select, Spin} from "antd";
import {Option} from "antd/es/mentions";
import {addProductAccount, getProductList, getProductZoneList} from "../../../api/tencentProduct";

import throttle from 'lodash/throttle';
import {FallOutlined} from "@ant-design/icons";


export class AddProductModal extends React.Component {
    state = {
        isModalVisible: false,
        isDisabledAddProductBtn: true,
        isDisabledSelectProductName: true,
        isDisabledSelectProductZone: true,
        isLoadingSelectProductZone: false,
        isLoadingModel: false,
        selectPlatformType: 0,
        optionProductList: [],
        optionProductZoneList: [],
        userProductZoneRoleName: '',
        productid: 0,
        zoneid: 0,
    }

    searchProductCallback = throttle(() => {
        let {selectPlatformType, searchValue} = this.state
        this.loadProductList({changeValue: selectPlatformType, name: searchValue})
    }, 1000, {leading: false})

    startAddRelationProduct = () => {
        this.setState({
            isModalVisible: true,
            isDisabledAddProductBtn: true,
            isDisabledSelectProductName: this.state.optionProductList.length === 0,
            isDisabledSelectProductZone: true,
            isLoadingSelectProductZone: false,
            isLoadingModel: false,
            selectPlatformType: 0,
            optionProductZoneList: [],
            userProductZoneRoleName: ''
        });
    }

    loadProductList = async ({changeValue, name}) => {
        try {
            this.setState({
                isLoadingSelectProductName: true,
                optionProductList: [],
                optionProductZoneList: [],
                userProductZoneRoleName: '',
                // isDisabledSelectProductName: true,
                isDisabledSelectProductZone: true,
            })

            let {data: {list}} = await getProductList({deviceType: changeValue, name: name})

            const tmp = []

            list.forEach(item => {
                tmp.push({
                    value: item['productid'],
                    text: item['productName'],
                })
            })

            this.setState({
                optionProductList: tmp
            })
        } catch (e) {

            message.error(e.msg)

            this.setState({
                isLoadingSelectProductName: false
            })
        } finally {
            this.setState({
                isDisabledSelectProductName: false,
                isLoadingSelectProductName: false
            })
        }
    }

    changeSelectProduct = async (productId) => {

        this.setState({
            isDisabledSelectProductZone: true
        })

        if (!productId)
            return;

        try {
            this.setState({
                isLoadingSelectProductZone: true,
                isDisabledSelectProductZone: true
            })

            let {data: {list}} = await getProductZoneList({productid: productId, name: '', page: 1})

            const tmp = []

            list.forEach(item => {
                tmp.push({
                    value: item['zoneid'],
                    text: item['zoneName'],
                    productid: item['productid']
                })
            })

            this.setState({
                optionProductZoneList: tmp,
            })
        } catch (e) {
            message.error(e.msg)

            this.setState({
                isLoadingSelectProductZone: false
            })
        } finally {
            this.setState({
                isLoadingSelectProductZone: false,
                isDisabledSelectProductZone: false
            })
        }
    }

    addProductZoneAccount = async () => {

        let {productid, zoneid} = this.state

        this.setState({
            isLoadingModel: true
        });

        try {
            addProductAccount({productid: productid, zoneid: zoneid, tacid: this.props.tacid})

            message.success("添加商品收款成功")

            this.setState({
                isLoadingModel: false,
                isModalVisible: false
            });

            this.props.onFinish()
        } catch (e) {
            message.error(e.msg)
            this.setState({
                isLoadingModel: false
            });
        }

    }

    render() {
        let {
            isModalVisible,
            isDisabledSelectProductName,
            isLoadingSelectProductName,
            isLoadingSelectProductZone,
            isDisabledSelectProductZone,
            selectPlatformType,
            isDisabledAddProductBtn,
            isLoadingModel
        } = this.state
        const optionProductList = this.state.optionProductList.map(d => <Option key={d.value}>{d.text}</Option>);
        const optionProductZoneList = this.state.optionProductZoneList.map(d =>
            <Option key={d.value} productid={d.productid}>{d.text}</Option>
        );

        return (
            <>
                <Modal title="添加关联商品" visible={isModalVisible} onOk={{}} onCancel={() => {
                    this.setState({isModalVisible: false})
                }}
                       footer={[
                           <Button key="back" onClick={() => {
                               this.setState({isModalVisible: false})
                           }}>
                               取消
                           </Button>,
                           <Button key="submit" type="primary" disabled={isDisabledAddProductBtn}
                                   onClick={this.addProductZoneAccount}>
                               添加
                           </Button>,
                       ]}
                >
                    <Spin spinning={isLoadingModel}>
                        <Row gutter={16}>
                            <Col span={10}>
                                <p style={{fontSize: "12px"}}>商品平台类型</p>
                                <Select placeholder="请选择平台类型" style={{width: "100%"}} onChange={(value, option) => {
                                    this.setState({
                                        selectPlatformType: value
                                    })
                                    this.loadProductList({changeValue: value, name: ''})
                                }}>
                                    <Option value="1">Pc</Option>
                                    <Option value="2">Mobile</Option>
                                </Select>
                            </Col>
                            <Col span={14}>
                                <p style={{fontSize: "12px"}}>商品名称</p>
                                <Select style={{width: "100%"}} placeholder="请选择商品"
                                        disabled={isDisabledSelectProductName}
                                        loading={isLoadingSelectProductName}
                                        onChange={this.changeSelectProduct}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onSearch={(searchValue) => {
                                            this.setState({
                                                searchValue: searchValue,
                                                selectPlatformType: selectPlatformType
                                            }, this.searchProductCallback)
                                        }}
                                        onClear={() => {
                                            this.loadProductList({changeValue: selectPlatformType, name: ''})
                                        }}
                                        showSearch allowClear>
                                    {optionProductList}
                                </Select>
                            </Col>
                            <Col span={24} style={{marginTop: "1rem"}}>
                                <p style={{fontSize: "12px"}}>请选择商品大区</p>
                                <Select style={{width: "100%"}} placeholder="请选择商品大区"
                                        disabled={isDisabledSelectProductZone}
                                        loading={isLoadingSelectProductZone}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={((value, option) => {
                                            this.setState({
                                                productid: option.productid,
                                                zoneid: option.value
                                            });
                                        })}
                                        showSearch>
                                    {optionProductZoneList}
                                </Select>
                            </Col>
                        </Row>
                    </Spin>
                </Modal>

                <Button type="primary" onClick={this.startAddRelationProduct} block>添加关联商品</Button>
            </>
        )
    }
}