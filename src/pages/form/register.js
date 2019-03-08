import React, { Component } from 'react';
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message, InputNumber } from "antd";

import './form.less';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Register extends Component{

    state={
        loading:false,
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            message.success(`你好,${values.username} !欢迎登录,你的密码为${values.password}`);
          }
        });
    }

    
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:12,
                sm:20
            }
        }
        const offsetLayout = {
            wrapperCol : {
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const {avatarUrl} = this.state;
        
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
        );

        return(
            <div>
                <Card title="注册表单" className="card-wrap">
                    <Form layout="horizontal" className='registerFrom'>
                        <Form.Item label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('username',{
                                    rules:[
                                        { required: true, message: '用户名不能为空!' }
                                    ]
                                })(<Input type="user" placeholder='请输入用户名' />)
                            }
                        </Form.Item>
                        <Form.Item label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    rules:[
                                        { required: true, message: '密码不能为空!' }
                                    ]
                                })(<Input type="password" placeholder='请输入密码' />)
                            }
                        </Form.Item>
                        <Form.Item label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:'1'
                                })(
                                    <Radio.Group>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue:18
                                })(
                                    <InputNumber />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue:'2'
                                })(
                                    <Select>
                                        <Option value="1">在职</Option>
                                        <Option value="2">离职</Option>
                                        <Option value="3">无经验</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('hobby',{
                                    initialValue:'2'
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">篮球</Option>
                                        <Option value="2">足球</Option>
                                        <Option value="3">游泳</Option>
                                        <Option value="4">排球</Option>
                                        <Option value="5">跳楼</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('marriage',{
                                    initialValue:'2'
                                })(
                                    <Switch defaultChecked />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue:moment('2019-03-08')
                                })(
                                    <DatePicker
                                        showTime={{ format: 'HH:mm' }}
                                        format="YYYY-MM-DD HH:mm"
                                     />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    
                                })(
                                    <TextArea 
                                        autosize={
                                            {minRows:2,maxRows:4}
                                        }
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('wake',{
                                    initialValue:moment('08:00:00', 'HH:mm:ss')
                                })(
                                    <TimePicker />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('avatar',{
                                    rules:[
                                        { required: true, message: '请上传头像!' }
                                    ]
                                })(
                                    <Upload
                                        listType='picture-card'
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : uploadButton}    
                                    </Upload>
                                )
                            }
                        </Form.Item>
                        <Form.Item  {...offsetLayout}>
                            {
                                getFieldDecorator('rules',{

                                })(
                                    <Checkbox>
                                        我已经阅读过<a href="#rule">用户协议</a>
                                    </Checkbox>
                                )
                            }
                        </Form.Item>
                        <Form.Item  {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

const registerForm = Form.create({ name: 'normal_login' })(Register);

export default registerForm;