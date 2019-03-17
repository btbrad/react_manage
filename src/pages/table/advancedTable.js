import React, { Component } from 'react';

import {Card,Table, Modal, Button, message,Badge} from 'antd';

import Axios from '../../axios';
import Utils from '../../utils/utils';

export default class AdvancedTable extends Component{
    state ={

    }

    params={
        page:1
    }
    componentDidMount=()=>{
        this.request();
    }

    // 动态获取mock数据
    request=()=>{
        let _this = this;
        Axios.ajax({
            url:'/table/advanced/list',
            data:{
                params:{
                    page:this.params.page
                },
                isShowLoading:true
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    dataSource:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:[],
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        _this.request();
                    }),
                });
            }
        });
    }

    handleChange = (p,f,sorter)=>{
        this.setState({
            sortOrder:sorter.order
        });
    }

    handleDelete=(item)=>{
        let id = item.id;
        Modal.confirm({
            title:'确认',
            content:`您确认要删除此条数据吗?${id}`,
            onOk:()=>{
                message.success('删除成功!');
                this.request();
            }
        })
    }

    render(){
        const columns =[
            {
                title:'id',
                dataIndex:'id',
                width:80
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80
            },
            {
                title:'性别',
                width:80,
                dataIndex:'sex',
                render(sex){
                    return sex===1 ? '男' : '女';
                }
            },
            {
                title:'状态',
                width:80,
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'无经验',
                        '2':'应届生',
                        '3':'在职',
                        '4':'失业',
                        '5':'跳楼'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                width:80,
                dataIndex:'hobby',
                render(hobby){
                    let config = {
                        '1':'美食',
                        '2':'旅行',
                        '3':'看书',
                        '4':'篮球',
                        '5':'足球',
                        '6':'乒乓',
                        '7':'狗狗',
                        '8':'猫'
                    }
                    return config[hobby];
                }
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday',
            },
            {
                title:'地址',
                width:250,
                dataIndex:'address',
            },
            {
                title:'早起时间',
                width:200,
                dataIndex:'time',
            }
        ];
        const columns2 =[
            {
                title:'id',
                dataIndex:'id',
                width:80,
                fixed:'left'
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80,
                fixed:'left'
            },
            {
                title:'性别',
                width:80,
                dataIndex:'sex',
                render(sex){
                    return sex===1 ? '男' : '女';
                }
            },
            {
                title:'状态',
                width:80,
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'无经验',
                        '2':'应届生',
                        '3':'在职',
                        '4':'失业',
                        '5':'跳楼'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                width:80,
                dataIndex:'hobby',
                render(hobby){
                    let config = {
                        '1':'美食',
                        '2':'旅行',
                        '3':'看书',
                        '4':'篮球',
                        '5':'足球',
                        '6':'乒乓',
                        '7':'狗狗',
                        '8':'猫'
                    }
                    return config[hobby];
                }
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday',
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday1',
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday2',
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday3',
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday4',
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday11',
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday6',
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday7',
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday8',
            },
            {
                title:'地址',
                width:250,
                dataIndex:'address',
            },
            {
                title:'早起时间',
                width:200,
                dataIndex:'time',
            }
        ];
        const column3 = [
            {
                title:'id',
                dataIndex:'id',
                width:80
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80
            },
            {
                title:'性别',
                width:80,
                dataIndex:'sex',
                render(sex){
                    return sex===1 ? '男' : '女';
                }
            },
            {
                title:'年龄',
                width:80,
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age - b.age
                },
                sortOrder:this.state.sortOrder
            },
            {
                title:'状态',
                width:80,
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'无经验',
                        '2':'应届生',
                        '3':'在职',
                        '4':'失业',
                        '5':'跳楼'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                width:80,
                dataIndex:'hobby',
                render(hobby){
                    let config = {
                        '1':'美食',
                        '2':'旅行',
                        '3':'看书',
                        '4':'篮球',
                        '5':'足球',
                        '6':'乒乓',
                        '7':'狗狗',
                        '8':'猫'
                    }
                    return config[hobby];
                }
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday',
            },
            {
                title:'地址',
                width:250,
                dataIndex:'address',
            },
            {
                title:'早起时间',
                width:200,
                dataIndex:'time',
            }
        ];
        const column4 = [
            {
                title:'id',
                dataIndex:'id',
                width:80
            },
            {
                title:'用户名',
                dataIndex:'userName',
                width:80
            },
            {
                title:'性别',
                width:80,
                dataIndex:'sex',
                render(sex){
                    return sex===1 ? '男' : '女';
                }
            },
            {
                title:'年龄',
                width:80,
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age - b.age
                },
                sortOrder:this.state.sortOrder
            },
            {
                title:'状态',
                width:80,
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':<Badge status="success" text="离职"/>,
                        '2':<Badge status="error" text="应届生"/>,
                        '3':<Badge status="default" text="在职"/>,
                        '4':<Badge status="processing" text="失业"/>,
                        '5':<Badge status="warning" text="跳楼"/>
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                width:80,
                dataIndex:'hobby',
                render(hobby){
                    let config = {
                        '1':'美食',
                        '2':'旅行',
                        '3':'看书',
                        '4':'篮球',
                        '5':'足球',
                        '6':'乒乓',
                        '7':'狗狗',
                        '8':'猫'
                    }
                    return config[hobby];
                }
            },
            {
                title:'生日',
                width:150,
                dataIndex:'birthday',
            },
            {
                title:'地址',
                width:250,
                dataIndex:'address',
            },
            {
                title:'早起时间',
                width:200,
                dataIndex:'time',
            },
            {
                title:'操作',
                render:(text,item)=>{
                    return <Button type="danger" size='small' onClick={()=>{this.handleDelete(item)}}>删除</Button>
                }
            }
        ];
        return(
            <div>
                <Card title="头部固定">
                    <Table
                        rowKey={(r,i)=>(i)}
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定">
                    <Table
                        rowKey={(r,i)=>(i)}
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 2200, y: 300 }}
                    />
                </Card>
                <Card title="表格排序">
                    <Table
                        rowKey={(r,i)=>(i)}
                        bordered
                        columns={column3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮">
                    <Table
                        rowKey={(r,i)=>(i)}
                        bordered
                        columns={column4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
            </div>
        )
    }
};