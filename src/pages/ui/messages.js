import React, { Component } from 'react';
import {Card,Button,Tooltip,Space,Radio,notification,message} from 'antd';
import './ui.less';

export default class Messages extends React.Component {
    showMessage=(type)=>{
        message[type]("恭喜你，获得共享单车终身会员！")
    }
    render() { 
        return (
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        );
    }
}
 
