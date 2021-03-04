import React from 'react'

import './orderList.css';

import {Table, Space} from 'antd';


const columns = [
    {
        title: '交易号/商户单号',
        dataIndex: 'tradeNo',
        key: 'tradeNo',
        render: (text, record) => (
            <div>
                <text>{text}</text>
                <br/>
                <text>{record.tradeNoOut}</text>
            </div>
        ),
    },
    {
        title: '名称',
        dataIndex: 'productName',
        key: 'productName',
    },
    {
        title: '金额',
        dataIndex: 'money',
        key: 'money',
        render: text => (
            <text>￥{parseInt(text) / 100}</text>
        )
    },
    {
        title: '创建时间/完成时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => (
            <div>
                <text>{text}</text>
                <br/>
                <text>{record.endTime ?? '未完成支付'}</text>
            </div>
        )
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => (
            <label>{parseInt(text) ? '已支付' : '未支付'}</label>
        )
    },

    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                {/*<a>Invite {record.name}</a>*/}
                <a href={"#"}>详细</a>
                <a href={"#"}>退款</a>
                <a href={"#"}>重新通知</a>
            </Space>
        ),
    },
];

const data = [
    {
        "tradeNo": "2020100617260860421",
        "tradeNoOut": "2020100617260792068",
        "money": 140,
        "type": 3,
        "createTime": "2020-10-06 17:26:08",
        "endTime": "2020-10-06 17:28:40",
        "status": 1,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100617210387718",
        "tradeNoOut": "2020100617210355374",
        "money": 508,
        "type": 3,
        "createTime": "2020-10-06 17:21:03",
        "endTime": null,
        "status": 0,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100617205240885",
        "tradeNoOut": "2020100617205259888",
        "money": 508,
        "type": 3,
        "createTime": "2020-10-06 17:20:52",
        "endTime": null,
        "status": 0,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100617190142927",
        "tradeNoOut": "2020100617190042904",
        "money": 23,
        "type": 3,
        "createTime": "2020-10-06 17:19:01",
        "endTime": "2020-10-06 17:21:28",
        "status": 1,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100617173452261",
        "tradeNoOut": "2020100617173392477",
        "money": 122,
        "type": 3,
        "createTime": "2020-10-06 17:17:34",
        "endTime": null,
        "status": 0,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100617142770157",
        "tradeNoOut": "2020100617142681324",
        "money": 99,
        "type": 3,
        "createTime": "2020-10-06 17:14:27",
        "endTime": "2020-10-06 17:16:55",
        "status": 1,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100617091078393",
        "tradeNoOut": "2020100617091093044",
        "money": 3197,
        "type": 3,
        "createTime": "2020-10-06 17:09:10",
        "endTime": "2020-10-06 17:11:52",
        "status": 1,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100616544531619",
        "tradeNoOut": "2020100616544434857",
        "money": 61,
        "type": 3,
        "createTime": "2020-10-06 16:54:45",
        "endTime": "2020-10-06 16:58:18",
        "status": 1,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100616450529848",
        "tradeNoOut": "2020100616450552085",
        "money": 1013,
        "type": 3,
        "createTime": "2020-10-06 16:45:05",
        "endTime": null,
        "status": 0,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100616445487611",
        "tradeNoOut": "2020100616445315290",
        "money": 171,
        "type": 3,
        "createTime": "2020-10-06 16:44:54",
        "endTime": "2020-10-06 16:47:25",
        "status": 1,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100616404160136",
        "tradeNoOut": "2020100616404156832",
        "money": 99,
        "type": 3,
        "createTime": "2020-10-06 16:40:41",
        "endTime": "2020-10-06 16:43:10",
        "status": 1,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100616390443950",
        "tradeNoOut": "2020100616390359189",
        "money": 420,
        "type": 3,
        "createTime": "2020-10-06 16:39:04",
        "endTime": null,
        "status": 0,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100616324263116",
        "tradeNoOut": "2020100616324284629",
        "money": 99,
        "type": 3,
        "createTime": "2020-10-06 16:32:42",
        "endTime": "2020-10-06 16:35:03",
        "status": 1,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100616305599439",
        "tradeNoOut": "2020100616305471789",
        "money": 69,
        "type": 3,
        "createTime": "2020-10-06 16:30:55",
        "endTime": "2020-10-06 16:33:21",
        "status": 1,
        "productName": "Pay"
    },
    {
        "tradeNo": "2020100616270555496",
        "tradeNoOut": "2020100616270518016",
        "money": 152,
        "type": 3,
        "createTime": "2020-10-06 16:27:05",
        "endTime": "2020-10-06 16:29:26",
        "status": 1,
        "productName": "Pay"
    }
];

class OrderList extends React.Component {
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data}/>
            </div>
        );
    }
}

export default OrderList;