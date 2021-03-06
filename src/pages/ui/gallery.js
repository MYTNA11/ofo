import React from "react";
import {Card,Row,Col,Modal} from 'antd';


export default class Gallery extends React.Component {
    state={
        visible:false
    }
    //点击图片获得路径放大显示
    openGallery=(imgSrc)=>{
        this.setState({
            visible:true,
            currentImg:'/gallery/'+imgSrc
        })
    }
    render() { 
        const imgs=[
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ]
        // 图片画廊卡片
        const imgList=imgs.map((list)=>list.map((item)=>
            <Card
                style={{marginBottom:10}}
                cover={<img src={'./gallery/'+item} onClick={()=>this.openGallery(item)}/>}
            >
                <Card.Meta
                    title="React Admin"
                    description="I Love You"
                />
            </Card>
        ))
        return (
            <div className="card-wrap">
                {/* 五行五列 */}
                <Row gutter={10}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                
                    <Col md={5}>
                        {imgList[4]}
                    </Col>
                </Row>

                {/* 图片展示模态框 */}
                <Modal 
                    width={300}
                    height={500}
                    visible={this.state.visible}
                    title="图片画廊"
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    footer={null}//关闭模态框页脚按钮
                >
                   <img src={this.state.currentImg} style={{width:'100%'}}/>
                </Modal>
            </div>
        );
    }
}
 
