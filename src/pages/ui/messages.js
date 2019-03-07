import React, { Component } from 'react'
import { Card, Button, message } from 'antd';

export default class Messages extends Component{

    openMessage = (type)=>{
        message[type](`this is a message of ${type}`);
    }
    render(){
        return(
            <div>
                <Card title='全局提示框' className='card-wrap'>
                    <Button type="primary" onClick={()=>this.openMessage('success')} >Success</Button>
                    <Button type="primary" onClick={()=>this.openMessage('info')} >Info</Button>
                    <Button type="primary" onClick={()=>this.openMessage('warning')} >Warning</Button>
                    <Button type="primary" onClick={()=>this.openMessage('error')} >Error</Button>
                    <Button type="primary" onClick={()=>this.openMessage('loading')} >Loading</Button>
                </Card>
            </div>
        )
    }
}