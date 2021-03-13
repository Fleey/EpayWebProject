import React from "react";
import {Drawer, Empty, List, message} from "antd";
import {AddProductModal} from "./addProductModal";
import {getProductAccount} from "../../../api/tencentProduct";


export class SelectProduct extends React.Component {

    state = {
        productDrawerVisible: false,
        productAccountList: []
    }

    closeProductDrawer = () => {
        this.setState({
            productDrawerVisible: false
        })
    }

    openProductDrawer = async () => {
        this.setState({
            productDrawerVisible: true
        })

        this.renderProductList()
    }

    renderProductList = async () => {
        try {
            let {data} = await getProductAccount({tacid: this.props.tacid})

            this.setState({
                productAccountList: data
            })
        } catch (e) {

            message.error(e.msg)

            this.setState({
                productDrawerVisible: false
            })
        }
    }

    render() {
        let {productDrawerVisible, productAccountList} = this.state


        return (
            <>
                <Drawer
                    title="关联支付商品"
                    placement="right"
                    width={600}
                    closable={false}
                    onClose={this.closeProductDrawer}
                    visible={productDrawerVisible}
                >
                    <AddProductModal onFinish={ async () =>{
                        this.renderProductList()
                    } } tacid={this.props.tacid}/>

                    {
                        productAccountList.length === 0 ? (
                                <Empty style={{marginTop: "5rem"}} description={"此QQ账号尚未关联支付商品"}/>
                            ) :
                            <>
                                <List
                                    bordered
                                    style={{marginTop: "2rem"}}
                                    dataSource={productAccountList}
                                    renderItem={item => (
                                        <List.Item
                                            actions={[
                                                <a key="list-loadmore-edit">设置金额</a>,
                                                <a key="list-loadmore-more">删除</a>
                                            ]}
                                        >
                                            {item.productName}（大区：{item.zoneName}）
                                        </List.Item>
                                    )}
                                />
                            </>
                    }
                </Drawer>

                <a style={this.props.style} onClick={this.openProductDrawer}>{this.props.children}</a>
            </>
        )
    }

}