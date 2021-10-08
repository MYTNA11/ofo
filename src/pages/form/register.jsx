import React, { Component } from 'react'
import {Button ,Card ,Form ,Input ,message ,Checkbox ,Radio ,Switch ,Select ,DatePicker ,TimePicker ,Upload ,InputNumber ,} from 'antd'
import {UserOutlined,LockOutlined,PlusOutlined }  from '@ant-design/icons';
import moment from '_moment@2.29.1@moment';
// import {createProxyMiddleware} from "http-proxy-middleware"


const FormItem=Form.Item;
const RadioGroup=Radio.Group;
const Option=Select.Option;
const TextArea=Input.TextArea;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';


export default class FormRegister extends Component {
    state={}

    onFinish=values=>{
        let userInfo=this.props.from.getFieldsValue();
        console.log(JSON.stringify(values));
    }

    //通过ref获取Form字段值
    formRef=React.createRef();
    //通过Form的 submit 监听 得到字段值
    onFinish=values=>{
        console.log('Received values of form: ',values);
        message.success(`${values.userName}，恭喜你注册成功，你的密码为${values.pwd}`)
    }

    getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              userImg:imageUrl,
              loading: false,
            }),
          );
        }
      };


    render() { 
        //栅格系统划分
        const formItemLayout={
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        //偏移值
        const offsetLayout={
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset: 4
                }
            }
        }

        const rowObject={
            minRows: 2, maxRows: 6
        }

        return (
            <div>
                <Card title="注册表单">

                <Form ref={this.formRef} onFinish={this.onFinish} layout="Horizontal">

                        <FormItem  name="userName" label="用户名" { ...formItemLayout}
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

                        <FormItem  name="pwd" label="密码"  { ...formItemLayout}
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

                        <FormItem  name="sex" label="性别" initialValue="1" { ...formItemLayout}
                            rules={[{ 
                                required: true,
                                message:'性别不能为空'
                                }]} >
                            <RadioGroup >
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </RadioGroup>
                        </FormItem>

                        <FormItem  name="age" label="年龄" initialValue="1" { ...formItemLayout}
                            rules={[{ 
                                required: true,
                                message:'年龄不能为空'
                                }]} >
                            <RadioGroup >
                                <InputNumber min={1} max={10} defaultValue={3}  />
                            </RadioGroup>
                        </FormItem>

                        <FormItem  name="state" label="当前状态"  { ...formItemLayout}
                            rules={[{ 
                                required: true,
                                message:'当前状态不能为空'
                                }]} >
                            {/* <RadioGroup > */}
                                <Select defaultValue='5'>
                                    <Option value="1">好</Option>
                                    <Option value="2">好好</Option>
                                    <Option value="3">好好学</Option>
                                    <Option value="4">好好学习</Option>
                                    <Option value="5">加油！</Option>
                                </Select>
                            {/* </RadioGroup> */}
                        </FormItem>

                        <FormItem name="interest"  label="爱好"  { ...formItemLayout} >
                            <RadioGroup >
                                <Select mode="multiple" defaultValue={['3','5']}>
                                    <option value="1">读书</option>
                                    <option value="2">游泳</option>
                                    <option value="3">听音乐</option>
                                    <option value="4">骑自行车</option>
                                    <option value="5">学习</option>
                                </Select>
                            </RadioGroup>
                        </FormItem>

                        <FormItem  name="isMarried" label="是否已婚"  { ...formItemLayout} >
                            <Switch defaultChecked />
                        </FormItem>

                        <FormItem  name="birthday" label="生日"  { ...formItemLayout} >
                            <DatePicker showTime format={dateFormat} defaultValue={moment('2008-08-08 ')} />
                        </FormItem>

                        <FormItem  name="address" label="联系地址"  { ...formItemLayout} 
                            rules={[{ 
                                required: true,
                                message:'联系地址不能为空'
                                }]} >
                            <TextArea autoSize={rowObject} defaultValue={'北京市海淀区奥林匹克公园'}/>
                        </FormItem>

                        <FormItem  name="time" label="早起时间"  { ...formItemLayout} >
                            <TimePicker  defaultValue={moment('07:00:00', 'HH:mm:ss')} />
                        </FormItem>

                        <FormItem  name="userImg" label="头像"  { ...formItemLayout} >
                            <Upload
                                listType="picture-card"
                                showUploadList={false}
                                action="/api"
                                onChange={this.handleChange}
                            >
                                {this.state.userImg?<img src={this.state.userImg}/>:<PlusOutlined />}
                            </Upload>
                        </FormItem>

                        <FormItem  { ...offsetLayout} >
                            <Checkbox>
                                我已阅读过<a href="#">用户协议</a>
                            </Checkbox>
                        </FormItem>

                        <FormItem { ...offsetLayout}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
