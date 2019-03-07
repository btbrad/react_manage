import React,{ Component } from 'react';
import { Card, Button, Modal } from 'antd';

export default class Modals extends Component {
    state={
        modal1:false,
        modal2:false,
        modal3:false,
        modal4:false
    }

    handleOpen = (type)=>{
        this.setState(
            {
                [type]:true
            }
        );
    }

    handleOk = ()=>{
        // this.setState(
        //     {
        //         visible:false
        //     }
        // )
    }

    handleCancel = (type)=>{
        this.setState(
            {
                [type]:false
            }
        )
    }
    showConfirm=(type)=>{
        Modal[type]({
            title:'你确定学会react了吗?',
            content:'react好难',
            onOk(){
                console.log('ok');
            },
            onCancel(){
                console.log('cancel');
            }
        }
        )
    }
    showInfo=()=>{
        Modal.info({
            title:'你确定学会react了吗?',
            content:'react好难',
            onOk(){
                console.log('ok');
            },
        }
        )
    }
    showSuccess=()=>{
        Modal.success({
            title:'成功',
            content:'学会了react!!!'
        }
        )
    }
    showError=()=>{
        Modal.error({
            title:'失败',
            content:'react从入门到放弃'
        }
        )
    }
    showWarning=()=>{
        Modal.warning({
            title:'警告',
            content:'学习react的时间不多了哦!'
        }
        )
    }


    render(){
        return(
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen('modal1')}>open</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('modal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('modal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('modal4')}>水平垂直居中</Button>
                    <Modal title="React" visible={this.state.modal1} onOk={this.handleOk} onCancel={()=>this.handleCancel('modal1')}>
                        <p>欢迎使用React</p>
                    </Modal>
                    <Modal title="React" visible={this.state.modal2} onOk={this.handleOk} onCancel={()=>this.handleCancel('modal2')} okText="yes sir" cancelText='no can do'>
                        欢迎使用AntD
                    </Modal>
                    <Modal title="React" visible={this.state.modal3} onOk={this.handleOk} onCancel={()=>this.handleCancel('modal3')} style={{top:20}}>
                        欢迎使用AntD
                    </Modal>
                    <Modal title="React" visible={this.state.modal4} onOk={this.handleOk} onCancel={()=>this.handleCancel('modal4')} centered>
                        欢迎使用AntD
                    </Modal>
                </Card>

                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.showConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.showConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.showConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.showConfirm('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.showConfirm('warning')}>Warning</Button>
                </Card>
            </div>
        )
    }
}