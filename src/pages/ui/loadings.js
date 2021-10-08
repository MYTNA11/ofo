import React, { Component } from 'react'
import { Card,Button,Spin,Icon,Alert } from 'antd'
import './ui.less'
import { LoadingOutlined } from '@ant-design/icons';

export default class Loadings extends Component {
    render() {
        const icon =<LoadingOutlined style={{fontSize:24}}/>
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{marginLeft:10}}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert 
                        message="React"
                        description="欢迎来到2050年"
                        type="info"
                    />
                    <Alert 
                        message="React"
                        description="欢迎来到2050年"
                        type="warning"
                    />
                    <Spin >
                        <Alert 
                            message="React"
                            description="欢迎来到2050年"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中..." indicator={icon}>
                        <Alert 
                            message="React"
                            description="欢迎来到2050年"
                            type="warning"
                        />
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert 
                            message="React"
                            description="欢迎来到2050年"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
