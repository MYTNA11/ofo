import React, { Component } from 'react';
import { Card, Form, Button, Select, Table, Modal, message } from 'antd';
import axios from '../../axios';
import '../../style/common.less';
import Utils from '../../utils/utils';

const Option = Select.Option;
const FormItem = Form.Item;

export default class City extends Component {
    
    formRef = React.createRef();
    state = {
        list: [],
        isShowOpenCity: false
    }

    params = {
        page: 1
    }

    componentDidMount() {
        this.requestList();
    }

    //默认请求我们的接口地址数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data: {
                params: {//使用params而不是用state的原因：
                    // 如果使用state，state中的变量会renderDOM结构，只改变页码不需要改变DOM结构，
                    // 页码只是参数变量，变量更改不需要DOM刷新，用普通变量即可
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.item_list.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    list: res.result.item_list.map((item, index) => {
                        item.key = index;
                        return item;
                    }),
                    //current--页码换页的时候，可以回调到下一次
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
                console.log("res>>>>>", res);

            }
        })
    }


    //开通城市
    handleOpenCity = () => {
        // alert("a")
        this.setState({
            isShowOpenCity: true
        })
    }
    //城市开通提交
    handleSubmit = () => {
        // let cityInfo=this.cityForm.props.form.getFieldValue();
        let values = this.formRef.current;
        let cityInfo = values.formRef.current.getFieldsValue();
        console.log("values>>>>", cityInfo);
        axios.ajax({
            url: '/city/open',
            data: {
                params: cityInfo
            }
        }).then((res) => {
            
                if (cityInfo == null) {
                    return false
                } else {
                    if (res.code === 0) {
                    message.success('开通成功');
                    this.setState({
                        isShowOpenCity: false
                    })
                    this.requestList();
                }
                }
        })
    }

    // /* 通过ref获取Form字段值 */
    // formRef = React.createRef();
    // /* 通过Form的 submit 监听 得到字段值 */
    // onFinish = values => {
    //     console.log('Received values of form: ', values);
    //     message.success(`${values.text},恭喜你注册成功，你的密码为${values.pwd}`)
    // }

    render() {
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id',
            },
            {
                title: '城市名称',
                dataIndex: 'name',
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode == 1?'停车点':'禁停区';
                }
            },
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode){
                    return op_mode == 1?'自营':'加盟';
                }
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchinese_name',
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time',
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render:Utils.fromateDate
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name',
            },
        ]

        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={() => this.handleOpenCity('showModal1')}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    {/* <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm=inst}}/> */}
                    <OpenCityForm ref={this.formRef} />
                </Modal>
            </div>
        )
    }
}

class FilterForm extends Component {
    render() {
        return (
            <Form layout="inline">
                <FormItem label="城市" name="city_id" rules={[{
                    required: true,
                }]}  >
                    <Select style={{ width: 80 }}
                        placeholder="全部"
                    >
                        <Option value="1">北京</Option>
                        <Option value="2">天津</Option>
                        <Option value="3">深圳</Option>
                    </Select>
                </FormItem>

                <FormItem label="订单时间" name="mode" rules={[{
                    required: true,
                }]}>
                    <Select style={{ width: 130 }}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点模式</Option>
                        <Option value="2">禁停区模式</Option>
                    </Select>
                </FormItem>

                <FormItem label="订单状态" name="op_mode" rules={[{
                    required: true,
                }]}>
                    <Select style={{ width: 80 }}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">进行中</Option>
                        <Option value="2">结束行程</Option>
                    </Select>
                </FormItem>

                <FormItem label="加盟商授权状态" name="auth_status" rules={[{
                    required: true,
                }]}>
                    <Select style={{ width: 80 }}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">已授权</Option>
                        <Option value="2">未授权</Option>
                    </Select>
                </FormItem>

                <FormItem label="加盟商授权状态">
                    <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

class OpenCityForm extends Component {
    formRef = React.createRef();
    render() {

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        // const {getFieldDecorator}=this.props.form;
        return (
            <Form layout="horizontal" ref={this.formRef}>
                <FormItem label="选择城市" {...formItemLayout} name="select_city">
                    <Select style={{ width: 100 }}>
                        <Option value="">全部</Option>
                        <Option value="1">北京</Option>
                        <Option value="2">天津</Option>
                    </Select>
                </FormItem>

                <FormItem label="营运模式" {...formItemLayout} name="yy_mode">
                    <Select style={{ width: 100 }}>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>

                <FormItem label="用车模式" {...formItemLayout} name="yc_mode">
                    <Select style={{ width: 100 }}>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                </FormItem>
            </Form>
        )
    }
}