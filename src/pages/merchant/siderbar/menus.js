global.user = {};

global.user.menus = [
    {
        'title': '仪表盘',
        'icon': 'dashboard',
        'key': '/merchant/dashboard',
    }, {
        'title': '订单列表',
        'icon': 'profile',
        'key': '/merchant/orderList'
    }, {
        'title': '申请提现',
        'icon': 'transaction',
        'key': '/merchant/applySettle'
    }, {
        'title': '余额充值',
        'icon': 'pay-circle',
        'key': '/merchant/rechargeBalance'
    }, {
        'title': '个人资料',
        'icon': 'idcard',
        'key': '/merchant/info'
    },
    {
        'title': '支付宝管理',
        'icon': 'alipay',
        'key': '/merchant/aliPay/accountList'
    }, {
        'title': '微信支付管理',
        'icon': 'message',
        'key': '/merchant/wechatPay',
        'subs': [
            {
                'title': '个人资料信息',
                'key': '/merchant/wechatPay/wechatMicroAccount',
                'icon': ''
            }, {
                'title': '订单投诉列表',
                'key': '/merchant/wechatPay/orderComplain',
                'icon': ''
            }
        ]
    }
];