import React, { Component } from 'react';
import { Row, Col,Button, Breadcrumb } from 'antd';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Utils from '../../utils/utils';
import axios from 'axios';
import './index.less'

export default class Header extends Component{
    componentWillMount() {
        this.setState({userName:'管理员233'});
        setInterval(() => {
           let sysTime = Utils.formatDate(new Date().getTime());
           this.setState({sysTime}); 
        }, 1000);
        this.getWeather();
        
    }
    getWeather=()=>{
        let weather = null;
        axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=07f3fa59f7edf7190efca1351346bc7b&city=341202')
            .then((res)=>{
                console.log(res);
                weather=res.data.lives[0].weather;
            })
            .catch((error)=>{
                console.log(error);
            });
        this.setState({weather});   
    }
    render(){
        let{userName,sysTime,weather} = this.state;
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span className="greeting">欢迎, {userName} </span>
                        <Button type="danger" size="small">退出</Button>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        <Breadcrumb>
                            <BreadcrumbItem>首页</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">{sysTime}</span>
                        <span className="weather-detail">{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}