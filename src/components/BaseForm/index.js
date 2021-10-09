import React, { Component } from 'react';
import { Form, Button, Select, Input,Checkbox,Radio } from 'antd';
import axios from '../../axios';
import '../../style/common.less';
import Utils from '../../utils/utils';
import '../../pages/order/detail.less'

const Option = Select.Option;
const FormItem = Form.Item;

export default class BaseForm extends Component {
    state = {}

    onFinish=values=>{
        let userInfo=this.props.from.getFieldsValue();
        console.log(JSON.stringify(values));
    } 
    //通过ref获取Form字段值
    formRef=React.createRef();
    

    handleFilterSubmit=()=>{
        //获取表单所有的值
        let fieldsValue=this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
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

                //input框
                if(item.type == 'INPUT'){
                    const INPUT=<FormItem label={label} key={field}  initialValue={initialValue}>
                        <input type="text" placeholder={placeholder}/>
                    </FormItem>
                    formItemList.push(INPUT);
                }
                //select下拉菜单
                else if(item.type == 'SELECT'){
                    const SELECT=<FormItem label={label} key={field}  initialValue={initialValue}>
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
                    const CHECKBOX=<FormItem label={label} key={field} 
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
        return formItemList
    }

    render(){
        return(
            <div>
                <Form ref={this.formRef} onFinish={this.onFinish} layout="inline">
                    {this.initFormList()}
                    <FormItem >
                        <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                        <Button onClick={this.reset}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
} 