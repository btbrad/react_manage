import React, { Component } from 'react';
import { Card, Spin, Icon, Alert } from 'antd';

import './ui.less'

export default class Loading extends Component {
    render(){
        const icon = <Icon type="loading" style={{fontSize:24}} />
        return(
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />    
                    <Spin />    
                    <Spin size="large"/>
                    <Spin indicator={icon} />    
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="react"
                        description="欢迎学习react"   
                        type="info"                     
                        >
                    </Alert>
                    <Alert
                        message="react"
                        description="欢迎学习react"   
                        type="warning"                     
                        >
                    </Alert>
                    <Spin>
                        <Alert
                            message="react"
                            description="欢迎学习react"   
                            type="info"                     
                            >
                        </Alert>
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="react"
                            description="欢迎学习react"   
                            type="info"                     
                            >
                        </Alert>
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert
                            message="react"
                            description="欢迎学习react"   
                            type="info"                     
                            >
                        </Alert>
                    </Spin>
                </Card>
            </div>
        )
    }
}