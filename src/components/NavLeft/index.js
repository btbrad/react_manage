import React, { Component } from 'react';
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom'

import './index.less';
import menuConfig from '../../config/menuConfig';

const SubMenu = Menu.SubMenu;

export default class NavLeft extends Component{

    componentWillMount() {
        let menuTreeNode = this.renderMenu(menuConfig);
        this.setState({
            menuTreeNode
        })
    }
    renderMenu=(data)=>{
        return (
            data.map((item)=>{
                return item.children? 
                        (<SubMenu key={item.key} title={<span>{item.title}</span>}>{this.renderMenu(item.children)}</SubMenu>) : 
                        (<Menu.Item key={item.key}>{
                            <NavLink to={item.key}>
                                {item.title}
                            </NavLink>
                        }</Menu.Item>)
            })
        )
    }
    render(){
        let {menuTreeNode} = this.state;
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Bicycle MS</h1>
                </div>
                <Menu mode="vertical" theme="dark">
                    {menuTreeNode}
                </Menu>
            </div>
            
        )
    }
}