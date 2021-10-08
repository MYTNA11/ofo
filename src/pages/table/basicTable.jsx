import React, { Component } from 'react'
import {Card ,Table,Modal,Button,message} from 'antd'
// import {UserOutlined,LockOutlined,PlusOutlined }  from '@ant-design/icons';
// import moment from '_moment@2.29.1@moment';
import axios from '../../axios';
import '../../style/common.less';
import Utils from '../../utils/utils';

export default class BasicTable extends Component {

    state={
        dataSource2:[]
    }
    params={
        page:1
    }
    
    // 基础表格静态数据
    componentDidMount(){
        const data=[
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2008-08-08',
                address:'北京海淀区',
                time:'09:00'
            },{
                id:'1',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2008-08-08',
                address:'北京海淀区',
                time:'09:00'
            },{
                id:'2',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2008-08-08',
                address:'北京海淀区',
                time:'09:00'
            }
        ]
        data.map((item,index)=>{
            item.key=index;
        })
        this.setState({
            dataSource:data
        })
        this.request();
    }

     
    request=()=>{
        let _this=this;
        axios.ajax({
            url:'/table/list',
            data:{
                params:{//使用params而不是用state的原因：
                        // 如果使用state，state中的变量会renderDOM结构，只改变页码不需要改变DOM结构，
                        // 页码只是参数变量，变量更改不需要DOM刷新，用普通变量即可
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                res.result.list.map((item,index)=>{
                    item.key=index;
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page=current;
                        this.request();
                    })
                })
            }
        })
    }

    //获得所在行信息
    onRowClick = (record,index)=>{
        let selectKey=[index];
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName},用户爱好：${record.interest}`
        })
        this.setState({
            selectRowKeys:selectKey,
            selectItem:record
        })
    }
    //多选执行删除动作
    //此时，selectedRows可以得到所选行的任何字段信息
    handleDelete=(()=>{
        let rows=this.state.selectedRows;
        let ids=[];
        console.log("rows",rows);
        rows.map((item)=>{
            ids.push(item.id) 
        })
        Modal.confirm({
            title:"删除提示",
            content:`您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    })

    // 列表项
    render(){
        const columns=[
                {
                title:'id',
                dataIndex:'id',
                key: "id"
            },{
                title:'用户名',
                dataIndex:'userName',
                key: "userName"
            },
            {
                title:'性别',
                dataIndex:'sex',
                key: "sex",
                render(sex){
                    return sex==1?'男':'女'
                }
            },{
                title:'状态',
                dataIndex:'state',
                key: 'state',
                render(state){
                    let config={
                        '1':"咸鱼一条",
                        '2':"北大才子",
                        '3':'风华浪子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },{
                title:'爱好',
                dataIndex:'interest',
                key: 'interest',
                render(interest){
                    let config={
                        '1':"游泳",
                        '2':"骑行",
                        '3':'阅读',
                        '4':'买基金',
                        '5':'睡觉'
                    }
                    return config[interest];
                }
            },{
                title:'生日',
                dataIndex:'birthday',
                key: 'birthday'
            },{
                title:'地址',
                dataIndex:'address',
                key: 'address'
            },{
                title:'早起时间',
                dataIndex:'time',
				key: 'time'
            }
        ]

        //定义选择类型
        //selectedRowKeys--指定选中项的key数组，需要和onchange进行配合
        const selectedRowKeys = this.state.selectedRowKeys;
        //rowSelection--选择功能的配置  单选
        const rowSelection={
            type:'radio',
            selectedRowKeys
        }
        //多选
        const rowCheckSelection={
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                console.log("selectedRows>>>>>",selectedRows);
                let ids=[];
                selectedRows.map((item)=>{
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    // selectedIds:ids 
                    selectedRows
                })
            }
        }

        return(
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={true}
                    />
                </Card>
                <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={true}
                    />
                </Card>
                <Card title="Mock-单选" style={{margin:'10px 0'}}>
                    
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            }
                        }
                        }
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={true}
                    />
                </Card>
                <Card title="Mock-多选" style={{margin:'10px 0'}}>
                    <div>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            }
                        }
                        }
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={true}
                    />
                </Card>
                <Card title="Mock-表格分页" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        //onRow--设置行属性
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            }
                        }
                        }
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={Utils.pagination}
                    />
                </Card>
            </div>
        )
    }
} 