import React, { Component } from 'react';

import {Card,Table, Modal, Button, message} from 'antd';

import Axios from '../../axios';
import Utils from '../../utils/utils';

export default class BasicTables extends Component{

    state={
        dataSource:[]
    }

    params={
        page:1
    }

    componentDidMount() {
        const dataSource = [
            {
                key:'1',
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                hobby:'1',
                birthday:'2000-01-01',
                address:'上海市人民广场001弄',
                time:'9:00'
            },
            {
                key:'2',
                id:'1',
                userName:'Tom',
                sex:'1',
                state:'1',
                hobby:'1',
                birthday:'2000-01-01',
                address:'上海市人民广场001弄',
                time:'9:00'
            },
            {   
                key:'3',
                id:'3',
                userName:'Tim',
                sex:'1',
                state:'1',
                hobby:'1',
                birthday:'2000-01-01',
                address:'上海市人民广场001弄',
                time:'9:00'
            }
        ];
        this.setState({
            dataSource
        });
        this.request();
    }

    // 动态获取mock数据
    request=()=>{
        let _this = this;
        Axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                },
                isShowLoading:true
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    dataSource2:res.result.list,
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

    onRowClick = (record,index)=>{
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名${record.userName},爱好${record.hobby}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem:record
        })
    }

    handleDelete = ()=>{
        let ids = [];
        let rows = this.state.selectedRows;
        rows.forEach((item,index)=>{
            ids.push(item.id);
        });
        Modal.confirm({
            title:'删除!',
            content:`你确定删除这些记录吗${ids.toString()}`,
            onOk:()=>{
                let newArr = this.state.dataSource2.filter((item,index)=>{
                    return ids.indexOf(item.id) === -1
                });
                console.log(newArr);
                message.success('删除成功');
                this.setState({
                    dataSource2:newArr,
                    selectedRowKeys:[],
                    selectedRows:[],
                })
            }
        })
    }

    render(){
        const columns =[
            {
                title:'id',
                dataIndex:'id',
            },
            {
                title:'用户名',
                dataIndex:'userName',
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex===1 ? '男' : '女';
                }
            },
            {
                title:'状态',
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
                dataIndex:'birthday',
            },
            {
                title:'地址',
                dataIndex:'address',
            },
            {
                title:'早起时间',
                dataIndex:'time',
            }
        ];
        const {dataSource,dataSource2,selectedRowKeys} = this.state;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        rowKey={(r,i)=>(i)}
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态渲染表格-Mock" className="card-wrap">
                    <Table
                        rowKey={(r,i)=>(i)}
                        bordered
                        columns={columns}
                        dataSource={dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" className="card-wrap">
                    <Table
                        rowKey={(record,index) => index}
                        rowSelection={rowSelection}
                        bordered
                        columns={columns}
                        dataSource={dataSource2}
                        pagination={false}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                    />
                </Card>
                <Card title="Mock-多选" className="card-wrap">
                    <div>
                        <Button type='danger' onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        rowKey={(record,index) => index}
                        rowSelection={rowCheckSelection}
                        bordered
                        columns={columns}
                        dataSource={dataSource2}
                        pagination={false}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                    />
                </Card>
                <Card title="Mock-表格分页" className="card-wrap">
                    <Table
                        rowKey={(record,index) => index}
                        bordered
                        columns={columns}
                        dataSource={dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
};