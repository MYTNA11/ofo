import React, { Component } from 'react';
import { Card, Form, Button, Select, Table, Modal, message,DatePicker } from 'antd';
import axios from '../../axios';
import '../../style/common.less';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm'

const Option = Select.Option;
const FormItem = Form.Item;

export default class Order extends Component {

    state={
        list: [],
        orderInfo:{},
        orderConfirmVisble:false,
        // selectedItem:{}
    }
    params = {
        page: 1
    }
    formList=[
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:100,
            list:[{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'深圳'}]
        },
        {
            type:'时间查询',
        },
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'1',
            width:100,
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'}]
        }
    ]
    //请求列表
    componentDidMount(){
        this.requestList();
    }

    handdleFilter=(params)=>{
        this.params=params;
        this.requestList();
    }

    requestList = () => {

        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {//使用params而不是用state的原因：
                    // 如果使用state，state中的变量会renderDOM结构，只改变页码不需要改变DOM结构，
                    // 页码只是参数变量，变量更改不需要DOM刷新，用普通变量即可
                    page: this.params.page
                }
            },
        }).then((res) => {
            if (res.code == 0) {
                let list=res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                })
                this.setState({
                    list,
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

     //获取当前所点击行
    onRowClick = (record,index)=>{
        
        let selectKey=[index];
        // alert(record)
       this.setState({
           selectedRowKeys:selectKey,//选中行的key赋值给选中的行
           selectedItem:record //record--获取当前所在行的字段值传给selectedItem
       })
    }
    //record-->selectedItem-->item(获取的当前所在行的字段值)

    //订单结束确认
    handdleConfirm=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:"请选择一条订单进行结束"
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:item
            }
        }).then((res)=>{
            if (res.code === 0) {
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble:true
                })
            }
        })
    }

    // 结束订单
    handdleFinishOrder=()=>{
        let item=this.state.selectedItem;
        axios.ajax({ 
            url:'/order/finish_order',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res)=>{
            if (res.code == 0) {
                message.success('订单结束成功！')
                this.setState({
                    orderConfirmVisble:false
                })
                this.requestList();
            }
        })
    }
   
    //订单详情
    openOrderDetail=()=>{
        // alert("s");
        let item=this.state.selectedItem;//当前所在行的字段值
        // console.log("item>>>", item);
        // debugger
        if(!item){//如果item为空弹出Modal
            Modal.info({
                title:'信息',
                content:"请选择一条订单"
            })
            return;
        }
        //所选行字段不为空跳转
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }

    render(){
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn',
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                // render(op_mode){
                //     return op_mode == 1?'自营':'加盟';
                // }
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000+'KM';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(mode){
                    return mode == 1?'停车点':'禁停区';
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
            },
        ]
        const FormItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:10}
        }
        const rowSelection={
            type:'radio'
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handdleFilter} />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handdleConfirm}>结束订单</Button>
                </Card>

                <div className="content-wrap">
                    <Table
                            // bordered
                            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                            columns={columns}//表头
                            dataSource={this.state.list}//数据
                            pagination={this.state.pagination}//页码
                            rowSelection={rowSelection}//按钮类型
                            selectedItem={this.state.selectedItem}
                            selectedRowKes={this.state.selectedRowKeys}
                            onRow={(record,index) => {
                                // alert()
                                return {
                                  onClick: () => {
                                      //record--获取当前所在行的字段值
                                      this.onRowClick(record,index);
                                      console.log("record>>>>>",record);
                                  }, // 点击行
                                };
                              }}
                        />
                </div>

                <Modal title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }}
                    onOk={this.handdleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" name="bike_sn" {...FormItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" name="battery" {...FormItemLayout}>
                            {this.state.orderInfo.battery+"%"}
                        </FormItem>
                        <FormItem label="行程开始时间" name="start_time" {...FormItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" name="start_time" {...FormItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                 </Modal>

            </div>
        )
    }
}

class FilterForm extends Component {
    onFinish=values=>{
        let userInfo=this.props.from.getFieldsValue();
        console.log(JSON.stringify(values));
    }
    //通过ref获取Form字段值
    formRef=React.createRef();

    render() {
        return (
            <Form ref={this.formRef}  onFinish={this.onFinish} layout="inline">
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

                    <DatePicker style={{marginRight:5}} format="YYYY-MM-DD HH:mm:ss"/>

                    <Select style={{ width: 130 }}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点模式</Option>
                        <Option value="2">禁停区模式</Option>
                    </Select>
                </FormItem>

                <FormItem label="订单状态" name="order_status" rules={[{
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