import React, { Component } from 'react'
import { Card, Tabs, Message, Icon  } from 'antd';

const TabPane = Tabs.TabPane;

export default class Tab extends Component{
    
    newTabIndex = 0;

    componentWillMount() {
        const panes = [
            {
                title:'tab 1',
                content:'tab 1',
                key:'1'
            },
            {
                title:'tab 2',
                content:'tab 2',
                key:'2'
            },
            {
                title:'tab 3',
                content:'tab 3',
                key:'3',
                closable: false
            }
        ];
        this.setState({
            activeKey:panes[0].key,
            panes
        });
    }
    
    callback=(key)=>{
        Message.info('您选择了页签: '+key);
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    
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

    render(){
        let {panes} = this.state;
        return(
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="tab1" key="1">Tab1</TabPane>
                        <TabPane tab="tab2" disabled key="2">Tab2</TabPane>
                        <TabPane tab="tab3" key="3">Tab3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图标页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">Tab1</TabPane>
                        <TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2">Tab2</TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">Tab3</TabPane>
                    </Tabs>
                </Card>
                <Card title="可关闭卡片式页签" className="card-wrap">
                    <Tabs type="editable-card" 
                     onChange={this.onChange}
                     activeKey={this.state.activeKey}   
                     onEdit={this.onEdit}>
                        {panes.map((item,index)=>(
                            <TabPane tab={item.title} key={item.key} closable={item.closable}>{item.content}</TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        )
    }
}