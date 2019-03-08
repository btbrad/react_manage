import React,{ Component } from 'react';
import { Card, Form, Icon, Input, Button, message, Checkbox, } from 'antd';

import './form.less';

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            message.success(`你好,${values.username} !欢迎登录,你的密码为${values.password}`);
          }
        });
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <div>
                <Card title='登录行内表单' className="card-wrap">
                    <Form layout='inline'>
                        <Form.Item>
                            <Input placeholder='请输入用户名' />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder='请输入密码' />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="登录框" className="card-wrap">
                    <Form onSubmit={this.handleSubmit} layout='horizontal' className="loginForm">
                        <Form.Item>
                            {
                                getFieldDecorator('username',{
                                    initialValue:'btbrad',
                                    rules:[
                                        { required: true, message: '用户名不能为空!' },
                                        { min:5,max:10,message:'长度不在范围内'},
                                        { pattern:/^[a-z0-9]+$/g,message:'用户名必须为字母或数字'}
                                    ]
                                })(<Input prefix={<Icon type='user'/>} type="user" placeholder='请输入用户名' />)
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    initialValue:'123456',
                                    rules:[
                                        { required: true, message: '密码不能为空!' }
                                    ]
                                })(<Input prefix={<Icon type='lock'/>} type='password' placeholder='请输入密码' />)
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('remember',{
                                    valuePropName: 'checked',
                                    initialValue:true
                                })(<Checkbox>记住我</Checkbox>)
                            }
                            <a href='forget' style={{float:'right'}}>忘记密码</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width:'100%'}}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

const loginForm = Form.create()(Login);

export default loginForm;