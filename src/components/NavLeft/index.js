import React, { Component } from 'react';
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/action/index';
import './index.less';
import menuConfig from '../../config/menuConfig';

const SubMenu = Menu.SubMenu;
class NavLeft extends Component{

    state = {
        currentKey:''
    }

    handleClick = ({item, key})=>{
        if (key === this.state.currentKey) {
            return false;
        }
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title));
        this.setState({
            currentKey:key
        });
    }

    componentWillMount() {
        let menuTreeNode = this.renderMenu(menuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState({
            currentKey,
            menuTreeNode
        })
    }

    renderMenu=(data)=>{
        return (
            data.map((item)=>{
                return item.children? 
                        (<SubMenu key={item.key} title={<span>{item.title}</span>}>{this.renderMenu(item.children)}</SubMenu>) : 
                        (<Menu.Item key={item.key} title={item.title}>{
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
                <Menu 
                    onClick={this.handleClick}
                    selectedKeys={[this.state.currentKey]}
                    mode="vertical" 
                    theme="dark"
                >
                    {menuTreeNode}
                </Menu>
            </div>
            
        )
    }
}

export default connect()(NavLeft);