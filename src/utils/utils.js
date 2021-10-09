import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

export default {
	//获取时间
	fromateDate(time) {
		if (!time) return '';  //判断如果没有时间，则直接返回空
		let date = new Date(time)
		let Hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours() //判断当前小时是否小于10，如果小于10，则为数据前添加0
		let Minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() //判断当前分钟是否小于10，如果小于10，则为数据前添加0
		let Seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds() //判断当前秒数是否小于10，如果小于10，则为数据前添加0
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + Hours + ':' + Minutes + ':' + Seconds //按照一定的日期时间格式返回当前日期和时间
	},

	//定义分页的公共机制
	pagination(data, callback) {
		return {
			onChange: (current) => {
				callback(current)
			},
			current: data.result.page,          //接收当前页码
			pageSize: data.result.page_size,  //接收每页展示的条数
			total: data.result.total,        //接收总的数据条数
			showTotal: () => {              //用于显示数据总量和当前数据顺序
				return `共${data.result.total_count}条`
			},
			showQuickJumper: true	       //是否可以快速跳转至某页
		}
	},

	// //孟--optionList封装
	// getOptionList(data) {
	// 	if (!data) {
	// 		return [];
	// 	}
	// 	let options = []
	// 	data.map((item) => {
	// 		options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
	// 	})
	// 	return options;
	// },

	//飞--optionList封装
	getOptionList(data){
		if(!data){
			return [];
		}
		//list:[{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'深圳'}]
		let option = [<Option value="0" key="all_key"></Option>];
		return data.map((item)=>{
			option.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
		})
	},


	//更新selectItemf封装
	updateSelectedItem(selectedRowKeys, selectedItem, selectedIds) {
		alert()
		if (selectedIds) {
			
			this.setState({
				selectedRowKeys,
				selectedItem,
				selectedIds
			})
		}
		this.setState({
			selectedRowKeys,
			selectedItem
		})
	}
}