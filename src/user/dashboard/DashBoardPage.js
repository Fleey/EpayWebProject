import React from 'react'

import './DashBoardPage.css';

import {Link} from 'react-router';
import {Statistic, Row, Col, Timeline} from 'antd';
import {Line, Pie} from '@antv/g2plot';

const data = [
    {"date": "2020-10-06 ", "time": "00:00", "value": 132}, {
        "date": "2020-10-06 ",
        "time": "01:00",
        "value": 154
    }, {"date": "2020-10-06 ", "time": "02:00", "value": 122}, {
        "date": "2020-10-06 ",
        "time": "03:00",
        "value": 85
    }, {"date": "2020-10-06 ", "time": "04:00", "value": 124}, {
        "date": "2020-10-06 ",
        "time": "05:00",
        "value": 153
    }, {"date": "2020-10-06 ", "time": "06:00", "value": 82}, {
        "date": "2020-10-06 ",
        "time": "07:00",
        "value": 133
    }, {"date": "2020-10-06 ", "time": "08:00", "value": 144}, {
        "date": "2020-10-06 ",
        "time": "09:00",
        "value": 132
    }, {"date": "2020-10-06 ", "time": "10:00", "value": 105}, {
        "date": "2020-10-06 ",
        "time": "11:00",
        "value": 156
    }, {"date": "2020-10-06 ", "time": "12:00", "value": 155}, {
        "date": "2020-10-06 ",
        "time": "13:00",
        "value": 105
    }, {"date": "2020-10-06 ", "time": "14:00", "value": 140}, {
        "date": "2020-10-06 ",
        "time": "15:00",
        "value": 132
    }, {"date": "2020-10-06 ", "time": "16:00", "value": 103}, {
        "date": "2020-10-06 ",
        "time": "17:00",
        "value": 121
    }, {"date": "2020-10-06 ", "time": "18:00", "value": 102}, {
        "date": "2020-10-06 ",
        "time": "19:00",
        "value": 152
    }, {"date": "2020-10-06 ", "time": "20:00", "value": 139}, {
        "date": "2020-10-06 ",
        "time": "21:00",
        "value": 122
    }, {"date": "2020-10-06 ", "time": "22:00", "value": 148}, {
        "date": "2020-10-06 ",
        "time": "23:00",
        "value": 118
    }, {"date": "2020-10-07 ", "time": "00:00", "value": 138}, {
        "date": "2020-10-07 ",
        "time": "01:00",
        "value": 101
    }, {"date": "2020-10-07 ", "time": "02:00", "value": 99}, {
        "date": "2020-10-07 ",
        "time": "03:00",
        "value": 154
    }, {"date": "2020-10-07 ", "time": "04:00", "value": 97}, {
        "date": "2020-10-07 ",
        "time": "05:00",
        "value": 154
    }, {"date": "2020-10-07 ", "time": "06:00", "value": 158}, {
        "date": "2020-10-07 ",
        "time": "07:00",
        "value": 154
    }, {"date": "2020-10-07 ", "time": "08:00", "value": 151}, {
        "date": "2020-10-07 ",
        "time": "09:00",
        "value": 120
    }, {"date": "2020-10-07 ", "time": "10:00", "value": 159}, {
        "date": "2020-10-07 ",
        "time": "11:00",
        "value": 130
    }, {"date": "2020-10-07 ", "time": "12:00", "value": 116}, {
        "date": "2020-10-07 ",
        "time": "13:00",
        "value": 100
    }, {"date": "2020-10-07 ", "time": "14:00", "value": 147}, {
        "date": "2020-10-07 ",
        "time": "15:00",
        "value": 139
    }, {"date": "2020-10-07 ", "time": "16:00", "value": 127}, {
        "date": "2020-10-07 ",
        "time": "17:00",
        "value": 123
    }, {"date": "2020-10-07 ", "time": "18:00", "value": 90}, {
        "date": "2020-10-07 ",
        "time": "19:00",
        "value": 114
    }, {"date": "2020-10-07 ", "time": "20:00", "value": 107}, {
        "date": "2020-10-07 ",
        "time": "21:00",
        "value": 103
    }, {"date": "2020-10-07 ", "time": "22:00", "value": 85}, {"date": "2020-10-07 ", "time": "23:00", "value": 107}
];

class DashBoardPage extends React.Component {

    componentDidMount() {

        //渲染当日与昨日成交额趋势
        this.renderTradeTrend();

        //渲染支付统计支付类型
        this.renderPayTypeStatistics();
    }

    renderPayTypeStatistics() {
        const data = [
            {type: '支付宝', value: 211117.44},
            {type: 'QQ钱包', value: 111125.11},
            {type: '微信支付', value: 222218.5},
            {type: '银联支付', value: 122225.1}
        ];

        const piePlot = new Pie('payTypeStatistics', {
            data,
            angleField: 'value',
            colorField: 'type',
            radius: 0.8,
            innerRadius: 0.64,
            statistic: {
                title: {
                    formatter: () => '总计',
                },
            },
            // 添加 中心统计文本 交互
            interactions: [{type: 'pie-statistic-active'}],
        });

        piePlot.render();
    }

    renderTradeTrend() {
        const linePlot = new Line('payTrendImg', {
            data,
            xField: 'time',
            yField: 'value',
            seriesField: 'date',
        });

        linePlot.render();
    }

    render() {

        return (
            <div>
                <div id="todayData">
                    <h3>当日数据</h3>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic title="总订单数" value={93}/>
                        </Col>
                        <Col span={6}>
                            <Statistic title="成功支付单数" value={93}/>
                        </Col>
                        <Col span={6}>
                            <Statistic title="交易额" value={1128.52} prefix="￥"/>
                        </Col>
                        <Col span={6}>
                            <Link to="/User/RechargeBalance">
                                <Statistic title="账户余额" value={9154.15} prefix="￥"/>
                            </Link>
                        </Col>
                    </Row>
                </div>
                {/*今日昨日 成交额趋势*/}
                <div id="payTrend">
                    <h3>当日/昨日 成交额趋势</h3>
                    <div id="payTrendImg" style={
                        {height: 300, marginTop: 20}
                    }/>
                </div>
                {/*今日昨日 成交额趋势*/}

                <div style={
                    {marginTop: 20}
                }>
                    <Row gutter={16}>
                        <Col span={16}>
                            <h3 style={
                                {marginBottom: 15}
                            }>站点公告</h3>
                            <Timeline>
                                <Timeline.Item>Create a services</Timeline.Item>
                                <Timeline.Item>Solve initial network problems</Timeline.Item>
                                <Timeline.Item>Technical testing</Timeline.Item>
                                <Timeline.Item>Network problems being solved</Timeline.Item>
                            </Timeline>
                        </Col>
                        <Col span={8}>
                            <h3>支付类型统计</h3>
                            <div id="payTypeStatistics" style={
                                {height: 350}
                            }/>
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}

export default DashBoardPage;