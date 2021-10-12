import React, { Component } from 'react';
import { Form, Button, Select, Input,Checkbox,Radio ,DatePicker,message} from 'antd';
import axios from '../../axios';
import '../../style/common.less';
import Utils from '../../utils/utils';
import '../../pages/order/detail.less'

const Option = Select.Option;
const FormItem = Form.Item;

export default class BaseForm extends Component {
    state = {}

    //通过ref获取Form字段值 
    //createRef创建ref实例对象，存储表单字段值
    formRef=React.createRef();

    // onFinish=values=>{
    //     // let userInfo=this.props.from.getFieldsValue();
    //     // console.log(JSON.stringify(values));
    //     console.log(values);
    // } 

    reset=()=>{
        this.props.form.resetFields();
    }

    handleFilterSubmit=()=>{
        //获取表单所有的值
        let dest = this.formRef.current//current--当前字段值
        console.log("this.formRef>>>>>", this.formRef);
        let fieldsValue = dest.getFieldsValue()//current.getFieldsValue()
        // let fieldsValue=this.props.form.getFieldsValue(true);
        //父———>子传递filterSubmit方法
        this.props.filterSubmit(fieldsValue);//获得fieldsValue对象得值，回传给父组件进行处理
        // debugger
    }

    initFormList=()=>{
        // const {getFieldDecorator} = this.props.form;
        const formList=this.props.formList;
        const formItemList=[];

        if(formList&&formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;//标签
                let field = item.field;//字段
                let initialValue = item.initialValue || "";//初始值
                let placeholder = item.placeholder;//占位文本
                let width = item.width;

                if(item.type =='时间查询'){ 
                    //起始时间
                    const begin_time=<FormItem name={field} label="订单时间" key={field}  initialValue={initialValue}>
                       <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH-mm-ss"/>
                    </FormItem>
                    formItemList.push(begin_time);

                    //终止时间
                    const end_time=<FormItem name={field} label="~" colon={false} key={field}  initialValue={initialValue}>
                       <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH-mm-ss"/>
                    </FormItem>
                    formItemList.push(end_time);
                }

                 //input框
                else if(item.type == 'INPUT'){
                    const INPUT=<FormItem  name={field} label={label} key={field}  initialValue={initialValue}>
                        <input type="text" placeholder={placeholder}/>
                    </FormItem>
                    formItemList.push(INPUT);
                }

                // select下拉菜单
                else if(item.type == 'SELECT'){
                    const SELECT=<FormItem name={field} label={label} key={field}  initialValue={initialValue}>
                        <Select style={{ width: width }}
                        placeholder={placeholder}
                    >
                        {Utils.getOptionList(item.list)}
                    </Select>
                    </FormItem>
                    formItemList.push(SELECT);
                }
                //Checkbox多选
                else if(item.type == 'CHECKBOX'){
                    const CHECKBOX=<FormItem name={field} label={label} key={field} 
                                    initialValue={initialValue} 
                                    valuePropName="checked">
                        <Checkbox>
                            {label}
                        </Checkbox>
                    </FormItem>
                    formItemList.push(CHECKBOX);
                }
            })
        }
        return formItemList;
    }

    render(){
        return(
            <div>
                <Form ref={this.formRef} onFinish={this.onFinish} layout="inline">
                    {this.initFormList()}
                    <FormItem >
                        <Button
                        type="primary" style={{ margin: '0 20px' }}
                         onClick={this.handleFilterSubmit}
                         >查询</Button>
                        <Button onClick={this.reset}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}