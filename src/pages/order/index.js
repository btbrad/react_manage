import React, { Component } from 'react';
import {Card, Button, Table, Form, Modal, message } from 'antd';
import BaseForm from '../../components/BaseForm';
import axios from '../../axios/index';
const FormItem = Form.Item;

export default class Order extends Component{

    state={
        list:[],
        orderInfo:{},
        orderConfirmVisble:false
    }

    params={
        page:1
    }

    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'0',
            width:'80',
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '0',
            width: '80',
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
    componentDidMount() {
        this.requestList();
    }
    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }
    requestList = ()=>{
        axios.requestList(this,'/order/list',this.params,true);
        // axios.ajax({
        //     url:'/order/list',
        //     data:{
        //         params:{
        //             page:this.params.page
        //         }
        //     }
        // }).then((res)=>{
        //     if(res.code === 0){
        //         this.setState({
        //             dataSource:res.result.item_list,
        //             pagination:Utils.pagination(res,(current)=>{
        //                 this.params.page = current;
        //                 this.requestList();
        //             })
        //         });
        //     }
        // });
    }

    // 订单结束确认
    handleConfirm = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code === 0 ){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }

    // 结束订单
    handleFinishOrder = ()=>{
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    //点击订单详情按钮
    openOrderDetail=()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请选择一条订单'
            })
            return;
        }
        window.location.href = `/#/common/order/detail/${item.id}`;
    }

    render(){
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_sn'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'手机号',
                dataIndex:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance'
            },
            {
                title:'行驶时长',
                dataIndex:'total_time'
            },
            {
                title:'状态',
                dataIndex:'status'
            },
            {
                title:'开始时间',
                dataIndex:'start_time'
            },
            {
                title:'结束时间',
                dataIndex:'end_time'
            },
            {
                title:'订单金额',
                dataIndex:'total_fee'
            },
            {
                title:'实付金额',
                dataIndex:'user_pay'
            }
        ];
        const {list} = this.state;
        const selectedRowKeys = this.state.selectedRowKeys;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        };
        return(
            <div>
                <Card>
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type='primary' style={{marginRight:20}} onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type='primary' style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={list}
                        rowKey={(record,index)=>index}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
};

// class FilterForm extends Component{
//     render(){
//         const { getFieldDecorator } = this.props.form;
//         return(
//             <Form layout='inline'>
//                 <FormItem label='城市'>
//                     {
//                         getFieldDecorator('city_id')(
//                             <Select style={{width:100}} placeholder='全部'>
//                                 <Option value=''>全部</Option>
//                                 <Option value='1'>北京市</Option>
//                                 <Option value='2'>天津市</Option>
//                                 <Option value='3'>深圳市</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label='订单时间'>
//                     {
//                         getFieldDecorator('start_time')(
//                             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder='选择开始时间'/>
//                         )
//                     }
//                 </FormItem>    
//                     <span>~</span>
//                 <FormItem>
//                     {
//                         getFieldDecorator('end_time')(
//                             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder='选择结束时间'/>
//                         )
//                     }
//                 </FormItem>    
//                 <FormItem label='订单状态'>
//                     {
//                         getFieldDecorator('op_mode')(
//                             <Select style={{width:150}} placeholder='全部'>
//                                 <Option value=''>进行中</Option>
//                                 <Option value='1'>进行中(临时锁车)</Option>
//                                 <Option value='2'>行程结束</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     <Button type='primary' style={{margin:'0 20px'}} onClick={this.handleQuery}>查询</Button>
//                     <Button>重置</Button>
//                 </FormItem>
//             </Form>
//         )
//     }
// }
// FilterForm = Form.create()(FilterForm);
