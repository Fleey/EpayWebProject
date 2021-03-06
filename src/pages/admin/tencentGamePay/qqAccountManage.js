import React, {useContext, useState, useEffect, useRef} from 'react'

import {Button, Col, Input, message, Popconfirm, Row, Table, Form} from "antd";
import {Content} from "antd/es/layout/layout";
import {SearchOutlined} from '@ant-design/icons';

import {deleteQQAccount, getQQLoginList, updateQQAccountRemark} from '../../../api/tencentQQLogin'
import Text from "antd/es/typography/Text";
import {formatDate} from "../../../utils/help";

const EditableContext = React.createContext(null);

const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                // rules={[
                //     {
                //         required: true,
                //         message: `${title} 不能为空`,
                //     },
                // ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

class QQAccountManage extends React.Component {
    accountColumns = [
        {
            title: 'id',
            dataIndex: 'tacid',
            key: 'tacid'
        }, {
            title: "商户号",
            dataIndex: "mchid",
            key: "mchid"
        }, {
            title: "QQ号",
            dataIndex: "uin",
            key: "uin"
        }, {
            title: "状态",
            dataIndex: "status",
            key: "status",
            render: (value) => {
                switch (value) {
                    case 1:
                        value = <Text type={"success"}>正常</Text>
                        break;
                    case 2:
                        value = <Text type={"danger"}>失效</Text>
                        break
                    default:
                        value = <Text strong>未知</Text>
                        break;
                }

                return value;
            }
        }, {
            title: "授权时间",
            dataIndex: "loginTime",
            key: "loginTime",
            render: (value) => formatDate(value * 1000)
        }, {
            title: "备注",
            dataIndex: "remark",
            key: "remark",
            editable: true,
            render: (value) => <Text ellipsis={{tooltip: value}} style={{width: 150}}>{value}</Text>
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record: { key: React.Key }) =>
                this.state.dataSource.length >= 1 ? (
                    <Popconfirm title="确定要删除?" onConfirm={() => this.handleDeleteAccount({tacid: record.tacid})}>
                        <a>删除</a>
                    </Popconfirm>
                ) : null,
        },
    ]

    state = {
        pagination: {
            current: 1,
            pageSize: 20,
        },
        dataSource: [],
        isLoadingTable: false,
    }

    handleDeleteAccount = async ({tacid}) => {
        this.setState({
            isLoadingTable: true
        })

        try {
            await deleteQQAccount({tacid: tacid})

            const {pagination} = this.state

            this.handleTableChange({current: pagination["current"], pageSize: pagination["pageSize"], total: 0}, {}, {})
        } catch (e) {
            message.error(e.message)
        } finally {
            this.setState({
                isLoadingTable: false
            })
        }
    }

    handleTableChange = async ({current, pageSize, total1}, filters, sorter) => {
        this.setState({
            isLoadingTable: true
        })

        let {data: {list, total}} = await getQQLoginList({
            uin: 0,
            mchid: 0,
            page: current,
            pagesize: pageSize
        })

        this.setState({
            pagination: {
                current: current,
                pageSize: pageSize,
                total: total
            },
            dataSource: list,
            isLoadingTable: false
        })
    }

    handleSaveAccount = async (row) => {
        let {tacid, remark} = row

        try {
            this.setState({
                isLoadingTable: true
            })

            await updateQQAccountRemark({tacid: tacid, remark: remark})

            const {pagination} = this.state

            this.handleTableChange({current: pagination["current"], pageSize: pagination["pageSize"], total: 0}, {}, {})
        } catch (e) {
            message.error(e.message)
        } finally {
            this.setState({
                isLoadingTable: false
            })
        }

        console.log(tacid, remark)
    }

    componentDidMount() {
        this.handleTableChange({current: 1, pageSize: 20, total: 0}, {}, {})
    }


    render() {
        const {dataSource, pagination, isLoadingTable} = this.state

        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };

        const columns = this.accountColumns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSaveAccount,
                }),
            };
        });

        return (
            <Content>
                <div className={'ctrl-bar'} style={{marginBottom: "1rem"}}>
                    <div className={'left-search'} style={{float: 'left', display: "block"}}>
                        <Row gutter={[14, 0]}>
                            <Col>
                                <Input placeholder="QQ号"/>
                            </Col>
                            <Col>
                                <Input placeholder="商户号"/>
                            </Col>
                            <Col>
                                <Button type="primary">
                                    <SearchOutlined/>搜索
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <div className={'right-btn'} style={{float: 'right', display: "block"}}>
                        <Button type="primary">添加QQ账号</Button>
                    </div>
                    <div style={{clear: "both"}}></div>
                </div>
                <Table rowKey={record => record.tacid}
                       components={components}
                       columns={columns} dataSource={dataSource} loading={isLoadingTable}
                       pagination={pagination} onChange={this.handleTableChange}/>
            </Content>
        )
    }
}

export default QQAccountManage