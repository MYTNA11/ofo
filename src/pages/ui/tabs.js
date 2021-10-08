import React, { Component } from 'react';
import {Card,message,Tabs,Icon} from 'antd';
import {PlusOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons';
import './ui.less';
const { TabPane } = Tabs;

export default class Tab extends Component {
    newTabIndex=0;
    handleCallback=(key)=>{
        message.info('Hi,你选择了页签：'+key);
    }
    //页签配置
    componentWillMount(){
        const panes=[
            {
                title:"Tab 1",
                content:"Tab 1",
                key:"1"
            },
            {
                title:"Tab 2",
                content:"Tab 2",
                key:"2"
            },
            {
                title:"Tab 3",
                content:"Tab 3",
                key:"3"
            }
        ]
        this.setState({
            activeKey:panes[0].key,
            panes:panes
        })
    }

    //将当前激活的key保存起来
    onChange=(activeKey)=>{
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    // 添加页签
    add = () => {
        const  panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey , content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
      };
    //删除页签
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
  
    }

    render() { 
        return (
            <div>
                <Card title="Tabs页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tabs带图页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><PlusOutlined />Tab 1</span>} key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab={<span><EditOutlined />Tab 2</span>} key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab={<span><DeleteOutlined />Tab 3</span>} key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="可编辑Tabs页签" className="card-wrap">
                    <Tabs 
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        // defaultActiveKey="1" 
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panes)=>{
                                return <TabPane
                                        tab={panes.title}
                                        content={panes.content}
                                        key={panes.key}
                                        />
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}
