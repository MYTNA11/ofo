import React, { Component } from 'react'
import {Card,Button,Tooltip,Space,Radio} from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { DownloadOutlined,
    PlusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    PoweroffOutlined,
    LoadingOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import './ui.less';

export default class Buttons extends Component {
    state = {
        loading: true,
        size: 'default'
      };

      handleCloseLoading=()=>{
          this.setState({
              loading :false
          })
      }

      handleChange=(e)=>{
          this.setState({
              size: e.target.value
          })
      }

    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Imoc</Button>
                    <Button>Imoc</Button>
                    <Button type="dashed">Imoc</Button>
                    <Button type="danger">Imoc</Button>
                    <Button disabled>Imoc</Button>
                </Card>

                <Card title="图形按钮" className="card-wrap">
                    <Button icon={<PlusCircleOutlined />}>创建</Button>
                    <Button icon={<EditOutlined />}>编辑</Button>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Tooltip title="search">
                        <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>
                    <Button type="primary" icon={<DownloadOutlined />} >
                        Download
                    </Button>
                </Card>

                <Card title="Loading按钮" className="card-wrap">
                <Button type="primary" onClick={this.handleCloseLoading} loading={this.state.loading}>
                    确定
                </Button>
                <Tooltip title="search">
                    <Button type="primary" shape="circle" icon={<PoweroffOutlined />} loading={this.state.loading} />
                </Tooltip>
                    <Button  loading={this.state.loading}>点击加载</Button>
                    <Tooltip title="search">
                        <Button shape="circle"  loading={this.state.loading}/>
                    </Tooltip>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>

                <Card title="按钮组" className="card-wrap">
                    <Space>
                        <Button type="primary" icon={<LeftOutlined />}>返回</Button>
                        <Button type="primary" icon={<RightOutlined />}>前进</Button>
                    </Space>
                </Card>

                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Imoc</Button>
                    <Button size={this.state.size}>Imoc</Button>
                    <Button type="dashed" size={this.state.size}>Imoc</Button>
                    <Button type="danger" size={this.state.size}>Imoc</Button>
                </Card>
            </div>
        )
    }
}
