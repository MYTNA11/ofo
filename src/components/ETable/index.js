import React,{Component} from "react";
import Utils from "../../utils/utils";
import {Table} from 'antd'

export default class ETable extends Component {

    onRowClick=(record,index)=>{

         let rowSelection=this.props.rowSelection;//选择功能的配置 radio || checkbox。
         if(rowSelection=='checkbox'){
            let selectedRowKeys=this.props.selectedRowKeys;//列表索引值
            let selectedItem=this.props.selectedItem;//得到的数据
            let selectedIds=this.props.selectedIds;//得到的数据
            
            if(selectedIds){
                //indexOf实现判断id是否存在，存在返回第一个索引，不存在返回-1。
                const i=selectedIds.indexOf(record.id);
                //判断是否已经选中
                if(i == -1){
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    selectedIds.splice(i,1);//splice截取字段，改变原来的数组 
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            }else{//如果没有值则赋值
                selectedIds=[record.id];
                selectedRowKeys=[index];
                selectedItem=[record];
            }//多选
            this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds)
         }else{//单选
             let selectedRowKeys=[index];//列表索引值
             let selectedItem=record;//得到的数据
             this.props.updateSelectedItem(selectedRowKeys,selectedItem )
         }
    }
    //表格的渲染
    tableInit=()=>{

        let row_selection=this.props.rowSelection;//选择功能的配置 radio || checkbox。
        let selectedRowKeys=this.props.selectedRowKeys;
        
        const rowSelection={
            type:'radio',
            selectedRowKeys,
            onchange:this.onSelectChange
        }

        if(row_selection === false || row_selection === null){
            row_selection=false;
        }else if(row_selection == 'checkbox'){
            rowSelection.type='checked';
        }else{
            row_selection='radio';
            row_selection='checkbox';
        }

        return <Table
        bordered
        {...this.props}
        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
        rowSelection={row_selection?rowSelection:null}//控制按钮类型单选还是多选
        // selectedRowKeys={this.state.selectedRowKeys}
        onRow={(record,index) => {
            // alert()
            return {
              onClick: () => {
                  if(!row_selection){
                      return;
                  }
                  //record--获取当前所在行的字段值
                  this.onRowClick(record,index);
                  console.log("record>>>>>",record);
              }, // 点击行
            };
        }}
        />
    }
    render(){
        return(
            <div>
                {this.tableInit()}
            </div>
        )
    }
}