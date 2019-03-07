import React, { Component } from 'react';
import { Card, Button, notification } from 'antd';

export default class Notification extends Component{

    openNotification = (type,placement)=>{
        if(placement){
            notification.config({
                placement:placement
            })
        }
        notification[type]({
            message:'领盒饭了',
            description:'午饭加鸡腿!!!',
        })
    }

    render(){
        return(
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框-方向控制" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>Success-TopLeft</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info','topRight')}>Info-TopRight</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning','bottomLeft')}>Warning-BottomLeft</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error','bottomRight')}>Error-BottomRight</Button>
                </Card>
            </div>
        )
    }
}