import React, { Component } from 'react';
import {Row,Col} from 'antd';
import './index.less';
import Util from '../../utils/utils';
import axios from 'axios';

export default class Header extends Component {
    state={
        weather:'',
        icon:''
    };
    //获取用户名、时间
    componentWillMount(){
        this.setState({
            userName:'河畔一角'
        })
        setInterval(() => {
           let sysTime= Util.fromateDate(new Date().getTime());
           this.setState({
            sysTime
           })
        }, 1000)
    }

    //获取天气
    componentDidMount(){
    
        axios({
            url:"https://devapi.qweather.com/v7/weather/now?location=101010100&key=3c27e9aa327e407793636ddb0b158dd7",
            method:"GET",
        }).then(res=>{
            console.log(res);
            let data=res.data.now;
            this.setState({
                weather:data.text,
                iconUrl:"assets/weathers/"+data.icon+'.png',
                windDir:data.windDir
            })
        })

    }

    render() {
        let { weather,iconUrl ,windDir} =this.state;
        const menuType=this.props.menuType;
        return (
            <div className="header">
                {/* 头部右侧按钮 */}
                <Row  className="header-top">
                    {
                        menuType?
                            <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span>ofo 通用管理系统</span>
                            </Col>:''
                    }
                    
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType?'':
                        <Row className="breadcrumb">
                            {/* 头部 "首页" */}
                            <Col span="4" className="breadcrumb-title">
                                首页
                            </Col>
                            {/* 头部日期、天气信息 */}
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-img">
                                    <img src={iconUrl} alt="" />
                                </span>
                                <span className="weather-detail">
                                    {weather}
                                </span>
                                <span className="weather-detail">
                                    {windDir}
                                </span>
                            </Col>
                        </Row>
                }
                
            </div>
        )
    }
}
