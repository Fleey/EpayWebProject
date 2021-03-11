import React from "react";
import {Drawer, Empty} from "antd";
import {AddProductModal} from "./addProductModal";


export class SelectProduct extends React.Component {

    state = {
        productDrawerVisible: false
    }

    renderProductList() {

    }

    closeProductDrawer = () => {
        this.setState({
            productDrawerVisible: false
        })
    }

    openProductDrawer = () => {
        this.setState({
            productDrawerVisible: true
        })
    }


    render() {
        let {productDrawerVisible} = this.state

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
                    <AddProductModal onFinish="" tacid={this.props.tacid}/>
                    <Empty style={{marginTop: "5rem"}} description={"此QQ账号尚未关联支付商品"}/>
                </Drawer>

                <a style={this.props.style} onClick={this.openProductDrawer}>{this.props.children}</a>
            </>
        )
    }
}