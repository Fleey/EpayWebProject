import React from "react";
import './IndexPage.css';

import {Result} from 'antd';

function IndexPage() {
    document.title = '首页';

    return (
        <Result
            status="404"
            title="正在施工中"
            subTitle="页面正在施工中，请稍后再刷新看。"
        />
    );
}

export default IndexPage;