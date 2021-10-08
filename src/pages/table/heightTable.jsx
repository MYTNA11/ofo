import React, { Component } from 'react'
import { Card, Table, Modal, Button, message,Badge } from 'antd'
import axios from '../../axios';
import Utils from '../../utils/utils';


export default class HeightTable extends Component {

    state = {

    }
    params = {
        page: 1
    }

    componentDidMount() {
        this.request();
    }

    //动态获取mock数据
    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/height/list',
            data: {
                params: {//使用params而不是用state的原因：
                    // 如果使用state，state中的变量会renderDOM结构，只改变页码不需要改变DOM结构，
                    // 页码只是参数变量，变量更改不需要DOM刷新，用普通变量即可
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource: res.result.list

                })
            }
        })
    }

    handdleChange=(pagination, filters, sorter)=>{
        console.log("::"+sorter);
        this.setState({
            sortOrder:sorter.order
        })
    }
    //删除操作
    handdleDelete=(item)=>{
        let id=item.id;
        Modal.confirm({
            title:'确认',
            content: "您确认要删除此条数据吗？",
            onOk:()=>{
                message.success('删除成功！');
                this.request();
            }
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                key: "id"
            }, {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                key: "userName"
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                key: "sex",
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                key: 'state',
                render(state) {
                    let config = {
                        '1': "咸鱼一条",
                        '2': "北大才子",
                        '3': '风华浪子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                key: 'interest',
                render(interest) {
                    let config = {
                        '1': "游泳",
                        '2': "骑行",
                        '3': '阅读',
                        '4': '买基金',
                        '5': '睡觉'
                    }
                    return config[interest];
                }
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '地址',
                dataIndex: 'address',
                width: 120,
                key: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time',
                width: 80,
                key: 'time'
            }
        ]
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                fixed: 'left',
                key: "id"
            }, {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                fixed: 'left',
                key: "userName"
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                key: "sex",
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                key: 'state',
                render(state) {
                    let config = {
                        '1': "咸鱼一条",
                        '2': "北大才子",
                        '3': '风华浪子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                key: 'interest',
                render(interest) {
                    let config = {
                        '1': "游泳",
                        '2': "骑行",
                        '3': '阅读',
                        '4': '买基金',
                        '5': '睡觉'
                    }
                    return config[interest];
                }
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '地址',
                dataIndex: 'address',
                width: 120,
                fixed: 'right',
                key: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time',
                width: 80,
                fixed: 'right',
                key: 'time'
            }
        ]
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                key: "id"
            }, {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                key: "userName"
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                key: "sex",
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },{
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                key: "age",
                sorter:(a,b)=>{
                    return a.age-b.age;
                },
                sortOrder:this.state.sortOrder
            },{
                title: '状态',
                dataIndex: 'state',
                width: 80,
                key: 'state',
                render(state) {
                    let config = {
                        '1': "咸鱼一条",
                        '2': "北大才子",
                        '3': '风华浪子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                key: 'interest',
                render(interest) {
                    let config = {
                        '1': "游泳",
                        '2': "骑行",
                        '3': '阅读',
                        '4': '买基金',
                        '5': '睡觉'
                    }
                    return config[interest];
                }
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
                key: 'birthday'
            }, {
                title: '地址',
                dataIndex: 'address',
                width: 120,
                key: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time',
                width: 80,
                key: 'time'
            }
        ]
        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
            }, {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },{
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                
            },{
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': "咸鱼一条",
                        '2': "北大才子",
                        '3': '风华浪子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': <Badge status="success" text="游泳"/>,
                        '2': <Badge status="success" text="骑行"/>,
                        '3': <Badge status="success" text="阅读"/>,
                        '4': <Badge status="success" text="买基金"/>,
                        '5': <Badge status="success" text="睡觉"/>
                    }
                    return config[interest];
                }
            }, {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
            }, {
                title: '地址',
                dataIndex: 'address',
                width: 120,
            }, {
                title: '操作',
                render:(text,item)=>{
                    return <Button  size="small" onClick={(item)=>{this.handdleDelete(item) }}>删除</Button>
                },
                width: 80,
            }
        ]
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={true}
                        scroll={{ y: 240 }}//设置y轴高度
                    />
                </Card>
                <Card title="左侧固定" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={true}
                        scroll={{ x: 4000 }}//设置x轴高度
                    />
                </Card>
                <Card title="表格排序" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={true}
                        onChange={this.handdleChange}
                        // scroll={{ x: }}//设置x轴高度
                    />
                </Card>
                <Card title="操作按钮" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={true}
                        onChange={this.handdleChange}
                        // scroll={{ x: }}//设置x轴高度
                    />
                </Card>
            </div>
        )
    }
}