import React from 'react';
import {Link} from 'react-router-dom';


import {Menu} from 'antd';
import {Icon} from '@ant-design/compatible';

import './menus';

const menus = global.user.menus;

class Sidebar extends React.Component {

    renderSubMenu = ({key, icon, title, subs}) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon}/>}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        );
    }

    renderMenuItem = ({key, icon, title,}) => {
        return (
            <Menu.Item key={key} title={title}>
                <Link to={key}>
                    {icon && <Icon type={icon}/>}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        );
    }

    sidebarMenuClickEvent({item, key, keyPath, domEvent}) {
        this._pathname = keyPath[0];
        document.title = this.getSelectMenuTitle() + ' - 用户中心';
    }


    /**
     *  获取选择边栏标题
     **/
    getSelectMenuTitle() {
        let titleName = '';

        menus.forEach(item => {
            if (item.subs && item.subs.length > 0) {
                //二级菜单

                item.subs && item.subs.forEach(subItem => {
                    if (subItem.key === this._pathname) {
                        titleName = subItem.title;
                    }
                });

            } else {
                //一级菜单
                if (item.key === this._pathname) {
                    titleName = item.title;
                }
            }
        });

        return titleName;
    }

    constructor({pathname}) {
        super();
        this._pathname = pathname;
    }

    render() {
        document.title = this.getSelectMenuTitle() + ' - 用户中心';

        let defaultOpenKey = this._pathname.substr(0, this._pathname.lastIndexOf("/"))

        return (
            <Menu
                defaultSelectedKeys={[this._pathname]}
                defaultOpenKeys={[defaultOpenKey]}
                mode="inline"
                onClick={this.sidebarMenuClickEvent.bind(this)}
            >
                {
                    menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
        );
    }
}

export default Sidebar;