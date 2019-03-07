import React, { Component } from "react";
import {Card, Row, Col, Modal} from 'antd';


const {Meta} = Card;

export default class Gallery extends Component {
    state={
        currentImg:null,
        visible:false
    }

    openGallery=(item)=>{
        this.setState({
            currentImg:'/gallery/'+item,
            visible:true
        });
    }

    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }

    render(){
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ];
        
        const imgList = imgs.map((list)=>list.map((item,index)=>(
            <Card key={index}
                cover={<img src={'/gallery/'+item} alt="antd img"/>}
                onClick={()=>{this.openGallery(item)}}
            >
                <Meta title="Ant design" description="this-a-gallery-test" />

            </Card>
        )));

        return(
            <div className="card-wrap">
                {/* {imgList.map((list,index)=><Row type="flex" justify="center" align="top" key={index} gutter={10}>{list.map((item,index)=><Col md={4} key={index}>{item}</Col>)}</Row>)} */}
                <Row type="flex" justify="center" align="top" gutter={10}>{imgList.map((list,index)=><Col span={4} key={index}>{list}</Col>)}</Row>

                <Modal
                    title='图片画廊'
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={300}
                    height={400}
                >
                    <img style={{'width':'100%'}} src={this.state.currentImg} alt="currentIMg" />
                </Modal>
            </div>
        )
    }
}