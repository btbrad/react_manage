import React, { Component } from 'react';
import {Card, Table, Button, Modal, Form, Input, Radio, Select, DatePicker, message} from 'antd';
import FilterForm from '../../components/BaseForm/index';
import axios from '../../axios/index';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

export default class User extends Component{

    state={
        list:[]
    }

    params={
        page:1
    }

    formList = [
        {
            type:'INPUT',
            placeholder:'请输入用户名',
            field:'name'
        },
        {
            type:'INPUT',
            placeholder:'请输入手机号',
            field:'phone'
        }
    ];
   
    componentDidMount() {
        this.requestList();
    }
   
    handleFilter=(params)=>{
        this.params = params;
        this.requestList();
    }

    requestList = ()=>{
        axios.requestList(this,'/user/list',true);
    }

    //选中行
    onRowClick=(record,index)=>{
        let selectedKey = [index];
        this.setState({
            selectedRowKeys: selectedKey,
            selectedItem: record
        });
    }

    handleOperate = (type)=>{
        if(type === 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工'
            });
        }else if(type === 'edit'){
            let item = this.state.selectedItem;
            if(!item){
                message.warning('请至少选择一项');
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑员工',
                userInfo:item
            });
        }else if(type === 'detail'){
            let item = this.state.selectedItem;
            if(!item){
                message.warning('请至少选择一项');
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'员工详情',
                userInfo:item
            });
        }else if(type === 'delete'){
            let item = this.state.selectedItem;
            if(!item){
                message.warning('请至少选择一项');
                return;
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除?',
                content:`确认删除 ${item.username} 吗?`,
                onOk(){
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code === 0){
                            _this.setState({
                                isVisible:false,
                            });
                            _this.requestList();
                        }
                    })
                }
            });
        }
    }

    //员工表单提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url:type==='create'?'/user/add':'/user/edit',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    isVisible:false
                });
                this.requestList();
                this.userForm.props.form.resetFields();
            }
        });
    }

    render(){
        const columns = [
            {
                title:'ID',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex === 1? '男':'女';
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                render:(state)=>{
                    const config = {
                        '1':'失业',
                        '2':'离职',
                        '3':'在校',
                        '4':'应届',
                        '5':'社招'
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                render:(hobby)=>{
                    const config = {
                        '1':'读书',
                        '2':'游泳',
                        '3':'旅行',
                        '4':'篮球',
                        '5':'足球',
                        '6':'高尔夫',
                        '7':'跨栏',
                        '8':'赛车'
                    }
                    return config[hobby];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'联系地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ];

        const { list, selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        let footer ={};
        if(this.state.type === 'detail'){
            footer = {
                footer:null
            }
        }
        return(
            <div>
                <Card>
                    <FilterForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card>
                        <Button type="primary" style={{marginRight:20}} onClick={()=>{this.handleOperate('create')}}>创建员工</Button>
                        <Button type="primary" style={{marginRight:20}} onClick={()=>{this.handleOperate('edit')}}>编辑员工</Button>
                        <Button type="primary" style={{marginRight:20}} onClick={()=>{this.handleOperate('detail')}}>员工详情</Button>
                        <Button type="danger"  onClick={()=>{this.handleOperate('delete')}}>删除员工</Button>
                </Card>
                <div className='content-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={list}
                        rowSelection={rowSelection}
                        pagination={this.state.pagination}
                        onRow={(record,index)=>{
                            return{
                                onClick:()=>{
                                this.onRowClick(record,index);
                            }}
                          } 
                        }
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.setState({
                            isVisible:false
                        });
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm wrappedComponentRef={(inst)=>this.userForm=inst} type={this.state.type} userInfo={this.state.userInfo}/>
                </Modal>
            </div>
        )
    }
};

class UserForm extends Component {

    getState=(state)=>{
        const config = {
            '1':'失业',
            '2':'离职',
            '3':'在校',
            '4':'应届',
            '5':'社招'
        }
        return config[state];
    }

    render(){

        const {type} = this.props;

        const userInfo = this.props.userInfo || {};
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol:{span:3},
            wrapperCol:{span:20}
        }

        return(
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {   
                        type === 'detail'? userInfo.username :
                        getFieldDecorator('username',{
                            initialValue:userInfo.username
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {   
                        type === 'detail'? userInfo.sex===1?'男':'女' :
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {   
                        type === 'detail'? this.getState(userInfo.state) :
                        getFieldDecorator('state',{
                            initialValue:userInfo.state
                        })(
                            <Select>
                                <Option value={1}>失业</Option>
                                <Option value={2}>离职</Option>
                                <Option value={3}>在校</Option>
                                <Option value={4}>应届</Option>
                                <Option value={5}>社招</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {   
                        type === 'detail'? userInfo.username :
                        getFieldDecorator('birthday',{
                            initialValue:moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {   
                        type === 'detail'? userInfo.address :
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址" /> 
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

UserForm = Form.create()(UserForm);