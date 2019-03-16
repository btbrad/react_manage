import React, { Component } from 'react';
import {Card, Table, Button, Modal, Form, Input, Radio, Select, DatePicker, message, Tree, Transfer} from 'antd';
import axios from '../../axios/index';
import Util from '../../utils/utils';
import moment from 'moment';
import menuConfig from '../../config/menuConfig';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
const { TreeNode } = Tree;

export default class PermissionUser extends Component {

    state = {
        isRoleVisible:false
    }

    params = {
        page:1
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = ()=>{
        axios.requestList(this,'/role/list',this.params,true);
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    // 打开创建角色弹框
    handleRole=()=>{
        this.setState({
            isRoleVisible:true
        });
    }

    // 角色提交
    handleRoleSubmit=()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        console.log(data);
        axios.ajax({
            url:'/role/create',
            data:{
                params:data
            },
            isMock:true
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    isRoleVisible:false
                });
                this.requestList();
                this.roleForm.props.form.resetFields();
            }
        });
    }


    // 设置权限
    handlePermission = () => {
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                content:'请选择一个角色'
            });
            return;
        }else{
            this.setState({
                isPermVisible:true,
                detailInfo:item,
                menuInfo:item.menus
            });
        }
    }


    // 提交设置权限的更改
    handlePermEditSubmit = ()=>{
        let data = this.permEditForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url:'/permission/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isPermVisible:false
                });
                // this.requestList();
            }
        });
    }

    // 用户授权
    handleUserAuth=()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                content:'请选择一个角色'
            });
            return;
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        });
        this.getRoleUserList(item.id);
    }

    getRoleUserList = (id)=>{
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id
                }
            }
        }).then((res)=>{
            this.getAuthUserList(res.result);
        });
    }

    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if(dataSource && dataSource.length > 0){
            dataSource.forEach((item,index)=>{
                const data = {
                    key:item.user_id,
                    title:item.user_name,
                    status:item.status
                }
                if(data.status === 1){
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            });
            this.setState({
                mockData,targetKeys
            });
        }
    }

    // 用户授权提交
    handleUserSubmit=()=>{
        let data = {};
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code === 0 ){
                this.setState({
                    isUserVisible:false
                });
                axios.requestList(this,'/role/list',this.params,true);
            }

        });
    }

    render(){
        const { list, selectedRowKeys } = this.state;
        const columns = [
            {
                title:'角色ID',
                dataIndex:'id'
            },
            {
                title:'角色名称',
                dataIndex:'role_name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render:(time)=>{
                    return Util.formatDate(time);
                }
            },
            {
                title:'使用状态',
                dataIndex:'status',
                render:(status)=>{
                    return status === 0 ? '停用':'启用';
                }
            },
            {
                title:'授权时间',
                dataIndex:'authorize_time',
                render:(time)=>{
                    return Util.formatDate(time);
                }
            },
            {
                title:'授权人',
                dataIndex:'authorize_user_name'
            }
        ];

        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        };

        return(
            <Card>
                <Button type='primary' style={{marginRight:20}} onClick={this.handleRole}>创建角色</Button>
                <Button type='primary' style={{marginRight:20}} onClick={this.handlePermission}>设置权限</Button>
                <Button type='primary' onClick={this.handleUserAuth}>用户授权</Button>
                <div style={{marginTop:20}}>
                    <Table
                        bordered 
                        rowKey={(record,index)=>index}
                        columns={columns}
                        dataSource={ list }
                        rowSelection={rowSelection}
                        onRow={
                            (record,index)=>{
                                return{
                                    onClick:()=>{
                                        this.onRowClick(record,index);
                                    }
                                }
                            }
                        }
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title='创建角色'
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={
                        ()=>{
                            this.roleForm.props.form.resetFields();
                            this.setState({
                                isRoleVisible:false
                            });
                        }
                    }
                >
                  <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst} />
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermVisible:false
                        });
                    }}
                >
                    <PermEditForm 
                        detailInfo={this.state.detailInfo} 
                        patchMenuInfo={(checkedKeys)=>{this.setState({menuInfo:checkedKeys})}} 
                        menuInfo={this.state.menuInfo}
                        wrappedComponentRef={(inst)=>this.permEditForm=inst}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible:false
                        });
                    }}
                >
                    <RoleAuthForm
                        mockData={this.state.mockData}
                        targetKeys={this.state.targetKeys}
                        detailInfo={this.state.detailInfo} 
                        patchMenuInfo={(checkedKeys)=>{this.setState({menuInfo:checkedKeys})}} 
                        menuInfo={this.state.menuInfo}
                        wrappedComponentRef={(inst)=>this.userAuthForm=inst}
                        patchUserInfo={(targetKeys)=>{
                          this.setState({
                             targetKeys 
                          });              
                        }}
                    />
                </Modal>
            </Card>
        )
    }
};

class RoleForm extends Component {

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
                <FormItem label="角色名称" {...formItemLayout}>
                    {   
                        type === 'detail'? userInfo.username :
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {   
                        type === 'detail'? this.getState(userInfo.state) :
                        getFieldDecorator('state')(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

RoleForm = Form.create()(RoleForm);

class PermEditForm extends Component{

    onCheck = (checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys);
    }

    renderTreeNodes = (data)=>{
        return data.map((item,index)=>{
            if(item.children){
                return (
                    <TreeNode title={item.title} key={'/admin'+item.key} >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode title={item.title} key={item.key} />
        });
    }

    render(){
        const formItemLayout = {
            labelCol:{ span:5 },
            wrapperCol:{ span:19 }
        }
        const { getFieldDecorator } = this.props.form;
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                        {
                            getFieldDecorator('status',{
                                initialValue:'1'
                            })(
                                <Select>
                                    <Option value="1">启用</Option>
                                    <Option value="0">停用</Option>
                                </Select>
                            )
                        }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{
                        this.onCheck(checkedKeys);
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create()(PermEditForm);

class RoleAuthForm extends Component{

    onCheck = (checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys);
    }

    renderTreeNodes = (data)=>{
        return data.map((item,index)=>{
            if(item.children){
                return (
                    <TreeNode title={item.title} key={'/admin'+item.key} >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode title={item.title} key={item.key} />
        });
    }

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1

    handleChange = (targetKeys)=>{
        this.props.patchUserInfo(targetKeys);
    }

    render(){
        const formItemLayout = {
            labelCol:{ span:5 },
            wrapperCol:{ span:19 }
        }
        const {mockData,targetKeys} = this.props;
        console.log(mockData,targetKeys);
        const { getFieldDecorator } = this.props.form;
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        listStyle={{width:200,height:400}}
                        dataSource={this.props.mockData}
                        titles={['待选用户', '已选用户']}
                        showSearch
                        searchPlaceholder="输入用户名"
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item=>item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create()(RoleAuthForm);