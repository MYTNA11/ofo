import React,{Component} from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import './style/common.less';

// import Home from './pages/home';
// import Buttons from './pages/ui/buttons';

export default class Common extends Component {
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Col span="24">
                         <Header menuType="second"/>
                    </Col>
                    
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        );
    }
}
