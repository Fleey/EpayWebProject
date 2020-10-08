global.user = {};

global.user.menus = [
    {
        'title': '仪表盘',
        'icon': 'dashboard',
        'key': '/User/Dashboard',
    }, {
        'title': '订单列表',
        'icon': 'profile',
        'key': '/User/OrderList'
    }, {
        'title': '申请提现',
        'icon': 'transaction',
        'key': '/User/ApplySettle'
    }, {
        'title': '余额充值',
        'icon': 'pay-circle',
        'key': '/User/RechargeBalance'
    }, {
        'title':'个人资料',
        'icon':'idcard',
        'key':'/User/Info'
    },
    {
        'title': '支付宝管理',
        'icon': 'alipay',
        'key': '/User/AliPay/AccountList'
    }, {
        'title': '微信支付管理',
        'icon': 'message',
        'key': '/User/WxPay',
        'subs': [
            {
                'title': '个人资料信息',
                'key': '/User/WxPay/WxMicroAccount',
                'icon': ''
            }, {
                'title': '订单投诉列表',
                'key': '/User/WxPay/OrderComplain',
                'icon': ''
            }
        ]
    }
];