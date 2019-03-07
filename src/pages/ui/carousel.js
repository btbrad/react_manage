import React,{ Component } from "react";
import {Card, Carousel} from 'antd';

export default class Carousels extends Component{
    render(){
        return(
            <div>
                <Card title="文字背景轮播" className='card-wrap'>
                    <Carousel autoplay effect="fade">
                        <div><h3>Ant-motion Banner-react</h3></div>
                        <div><h3>Ant-motion Banner-vue</h3></div>
                        <div><h3>Ant-motion Banner-angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片背景轮播" className='card-wrap'>
                    <Carousel autoplay effect="fade" className='imgCarousel'>
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt="1"/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt="2"/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="3"/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}