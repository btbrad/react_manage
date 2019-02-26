import React, { Component } from 'react'
import Child from './Child'
import {Button} from 'antd'

import './index.less'

export default class Life extends Component{

    constructor(props){
        super(props);
        this.state = {
            count:0
        }
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(){
        let {count} = this.state;
        this.setState({
            count: ++count
        })
    }

    handleClick=()=>{
        let {count} = this.state;
        this.setState({
            count: ++count
        })
    }

    render(){
        let {count} = this.state;
        return (
            <div style={{padding:50}}>
                <p className="content">React生命周期介绍</p>
                <Button onClick={this.handleAdd}>点击一下</Button>
                <Button onClick={this.handleClick}>点击一下</Button>
                <p>{count}</p>
                <Child count={count}/>
            </div>
        )
    }
}