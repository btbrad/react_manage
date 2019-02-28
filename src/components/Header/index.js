import React, { Component } from 'react';
import { Row, Col,Button} from 'antd';
import Utils from '../../utils/utils';
import axios from '../../axios';
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
        let city = encodeURIComponent("上海");
        axios.jsonp({
            url:`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        })
        .then((res)=>{
                let weather=res.results[0].weather_data[0].weather;
                let weatherPic=res.results[0].weather_data[0].dayPictureUrl;
                this.setState({weather,weatherPic});   
        },(error)=>{
            console.log(error);
        })
    }
    render(){
        let{userName,sysTime,weather,weatherPic} = this.state;
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
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">{sysTime}</span>
                        <span className="weather-detail"><img src={weatherPic} alt="weatherPic"></img>{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}