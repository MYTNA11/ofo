import React, { Component } from 'react'
import MenuConfig from '../../config/menuConfig'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less'
import Item from 'antd/lib/list/Item';
import MenuItem from 'antd/lib/menu/MenuItem';
const { SubMenu } = Menu;

export default class NavLeft extends Component {
    componentWillMount(){
        //菜单树节点
        const menuTreeNode=this.renderMenu(MenuConfig);
        this.setState({//修改state
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu=(data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>{/*一级菜单*/}
                          {this.renderMenu(item.children)}{/*子菜单 */}
                    </SubMenu>
                )
            }
            //没有子节点直接返回一级菜单item
            return <Menu.Item title={item.title} key={ item.key}>
                       <NavLink to={item.key}>{item.title}</NavLink>
                   </Menu.Item>
        })
    }
    render() {
        return (
            <div>
                {/* 导航栏logo */}
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>OFO MS</h1>
                </div>
                <Menu theme="dark">
                    {/* 插入完整菜单树节点 */}
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
