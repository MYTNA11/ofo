import React, { Component } from 'react'
import {Button, Card,Form,Input, message,Checkbox } from 'antd'
import {UserOutlined,LockOutlined }  from '@ant-design/icons';

const FormItem=Form.Item;

export default class FormLogin extends Component {
    //通过ref获取Form字段值
    formRef=React.createRef();
    //通过Form的 submit 监听 得到字段值
    onFinish=values=>{
        console.log('Received values of form: ',values);
        message.success(`${values.text},恭喜你注册成功，你的密码为${values.pwd}`)
    }
    // //获取input的value值
    // getValues = () => {
    //     const form = this.formRef.current
    //     console.log(form);
    //     const values = form.getFieldsValue(['text','pwd'])
    //     console.log(values);
    // }

    render() {

        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input type="text" placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input type="password" placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card title="登录水平表单">
                    <Form ref={this.formRef} onFinish={this.onFinish} layout="Horizontal" style={{width:300}}>
                        <FormItem  name="text" 
                            rules={[{ 
                                required: true,
                                message:'用户名不能为空'
                                },{
                                    min:5,max:10,
                                    message:'用户名长度应为5~10位'
                                },{
                                    pattern:new RegExp('^\\w+$','g'),
                                    message:'用户名必须为字母或数字'
                                }]} >
                            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem  name="pwd" 
                            rules={[{ 
                                required: true,
                                message:'密码不能为空'
                                },{
                                    min:6,max:16,
                                    message:'密码长度应为6~16位'
                                },{
                                    pattern:new RegExp('^\\w+$','g'),
                                    message:'密码必须为字母或数字'
                                }]} >
                            <Input prefix={<LockOutlined />}  type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem >
                            <FormItem name="remember" valuePropName="checked" initialValue="true" wrapperCol={{ offset: 8, span: 16 }} noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </FormItem>
                            <a className="login-form-forgot" href="/#/admin" style={{float:'right'}}>
                                忘记密码
                            </a>
                        </FormItem>
                        <FormItem >
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
