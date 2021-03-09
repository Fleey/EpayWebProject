global.user = {};

global.user.menus = [
    {
        'title': '仪表盘',
        'icon': 'dashboard',
        'key': '/admin/dashboard',
    }, {
        'title': '订单列表',
        'icon': 'profile',
        'key': '/admin/orderList'
    }, {
        'title': '腾讯游戏支付',
        'icon': 'message',
        'key': '/admin/tencentPay',
        'subs': [
            {
                'title': 'QQ账号管理',
                'key': '/admin/tencentPay/qqAccountManage',
                'icon': ''
            }, {
                'title': '数据统计',
                'key': '/admin/tencentPay/orderComplain',
                'icon': ''
            }
        ]
    }
];