import React, { Component } from 'react';
import {Card,Button, Icon,Radio} from 'antd'

import "./ui.less";

export default class Buttons extends Component{
    
    state={
        loading:true,
        size:'default'
    }
    handleCloseLoading=()=>{
        this.setState({
            loading:false
        })
    }
    handleRadioChange=(event)=>{
        this.setState({
            size:event.target.value
        })
    }

    render(){
        return(
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">React</Button>
                    <Button>React</Button>
                    <Button type="danger">React</Button>
                    <Button type="dashed">React</Button>
                    <Button disabled>React</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button type="primary" icon="plus">创建</Button>
                    <Button type="primary" icon="edit">编辑</Button>
                    <Button type="danger" icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group size="large">
                        <Button type="primary" style={{marginRight:0}}>
                            <Icon type="left"/>
                            前进
                        </Button>
                        <Button type="primary">
                            <Icon type="right"/>
                            后退
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleRadioChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>React</Button>
                    <Button size={this.state.size}>React</Button>
                    <Button type="danger" size={this.state.size}>React</Button>
                    <Button type="dashed" size={this.state.size}>React</Button>
                    <Button disabled size={this.state.size}>React</Button>
                </Card>
            </div>
        )
    }
}