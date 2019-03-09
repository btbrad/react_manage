import React, { Component } from 'react';
import {Card, Button, Table, Form, Select, DatePicker } from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;


export default class Order extends Component{

    state={
        dataSource:[]
    }

    params={
        page:1
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = ()=>{
        axios.ajax({
            url:'/order/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    dataSource:res.result.item_list,
                    pagination:Utils.pagination(res,(current)=>{
                        this.params.page = current;
                        this.requestList();
                    })
                });
            }
        });
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
        const {dataSource} = this.state;
        return(
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type='primary' style={{marginRight:20}}>订单详情</Button>
                    <Button type='primary'>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={(record,index)=>index}
                        pagination={this.state.pagination}
                    />
                </div>
            </div>
        )
    }
};

class FilterForm extends Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout='inline'>
                <FormItem label='城市'>
                    {
                        getFieldDecorator('city_id')(
                            <Select style={{width:100}} placeholder='全部'>
                                <Option value=''>全部</Option>
                                <Option value='1'>北京市</Option>
                                <Option value='2'>天津市</Option>
                                <Option value='3'>深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='订单时间'>
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder='选择开始时间'/>
                        )
                    }
                </FormItem>    
                    <span>~</span>
                <FormItem>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder='选择结束时间'/>
                        )
                    }
                </FormItem>    
                <FormItem label='订单状态'>
                    {
                        getFieldDecorator('op_mode')(
                            <Select style={{width:150}} placeholder='全部'>
                                <Option value=''>进行中</Option>
                                <Option value='1'>进行中(临时锁车)</Option>
                                <Option value='2'>行程结束</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type='primary' style={{margin:'0 20px'}} onClick={this.handleQuery}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create()(FilterForm);
