import React, { Component } from 'react';
import { Card, Form, Button, Select, Table, Modal, message, DatePicker } from 'antd';
import axios from '../../axios';
import '../../style/common.less';
import Utils from '../../utils/utils';
import './detail.less'

const Option = Select.Option;
const FormItem = Form.Item;

export default class Detail extends Component {
    state = {
       
    }

    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId);
        }
    }
    //获取详细信息
    getDetailInfo = (orderId) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result);
            }
        })
    }
    //渲染地图
    renderMap = (result) => {
        this.map = new window.BMapGL.Map("orderDetailMap", { enableMapClick: false });
        this.addMapControl();//添加地图控件
        this.drawBikeRoute(result.position_list);//调用绘制用户的行驶路线图方法
        console.log("result.position_list>>>",result.position_list);

    }
    //添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));// 添加比例尺控件
        map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new window.BMapGL.ZoomControl());  // 添加缩放控件
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }

    //绘制用户的行驶路线    最高点
    drawBikeRoute = (position_list) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        
        if (position_list.length > 0) {//路线长度大于0--用户有行驶轨迹
            let first = position_list[0];//起始坐标点
            let last = position_list[position_list.length-1];//終點坐标点

            //创建一个起始坐标点
            
            startPoint = new window.BMapGL.Point(first.lon, first.lat);
            console.log("startPoint>>>",startPoint);
            let startIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36,42),//new Icon 需要的空间
                {
                    imageSize: new window.BMapGL.Size(36, 42),//空间内图片的大小
                    anchor: new window.BMapGL.Size(36, 42)//停靠的位置
                }
            )
            //在地图上增加起点
            let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon });
            this.map.addOverlay(startMarker);

            //创建一个終點坐标点
            endPoint = new window.BMapGL.Point(last.lon, last.lat);
            console.log("endPoint>>>",endPoint);
            let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36,42),//new Icon 需要的空间
                {
                    imageSize: new window.BMapGL.Size(36, 42),//空间内图片的大小
                    anchor: new window.BMapGL.Size(36, 42)//停靠的位置
                }
            )
            //在地图上增加終点
            let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);

            //連接路線圖
            let trackPoint=[];//保存所有轨迹坐标点
            for(let i=0;i<position_list.length;i++){
                let point=position_list[i];
                trackPoint.push(new window.BMapGL.Point(point.lon,point.lat));
            }
            let polyline= new window.BMapGL.Polyline(trackPoint,{
                strokeColor:'#1869AD',
                strokeWeight:2,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
        }

    }

    render() {

        const info = this.state.orderInfo || {};
        return (
            <div>
                <Card >
                    {/* 地图 */}
                    <div id="orderDetailMap" className="order-map"></div>

                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode == 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>

                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location} </div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程里程</div>
                                <div className="detail-form-content">{info.distance / 1000}公里</div>
                            </li>

                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
