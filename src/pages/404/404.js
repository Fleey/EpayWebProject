import './404.css';

import React from "react";

import { Result, Button, Typography } from 'antd';

const { Paragraph, Text } = Typography;

function NotFoundPage() {
    document.title = '页面不存在';

    return (
        <div className="NotFoundPage">
            <Result
                status="error"
                title="404 Not Found Page"
                subTitle="页面不存在，你也许需要返回上一步重试。"
                extra={[
                    <Button type="primary" key="console">
                        返回首页
                    </Button>,
                    <Button key="buy">返回上一步</Button>,
                ]}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            遇到此页面解决办法：
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        1、联系网站管理员人。
                    </Paragraph>
                    <Paragraph>
                        2、关闭浏览器重新打开此页面重试。
                    </Paragraph>
                    <Paragraph>
                        3、按下 Alt+F5 进行刷新页面重试。
                    </Paragraph>
                </div>
            </Result>
        </div>
    );
}

export default NotFoundPage;