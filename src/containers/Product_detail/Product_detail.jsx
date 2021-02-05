import React, { Component } from 'react'
import {Card, Button, List,message} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import {reqGetProductInfo} from '../../api'
import { createSaveCategoryListActionAsync } from '../../redux/actions/Category_action'
import './css/product_detail.less'

const { Item } = List

class ProductDetail extends Component {

    state = {
        ProductInfo: {
            imgs: [],
            name: '',
            price: 0,
            desc: '',
            categoryId: '',
            detail:''
            
        }
    }
    
    //根据商品Id获取商品详细信息
    getProductDetail = async() => {
        const { id } = this.props.match.params
        let { status, data, msg } = await reqGetProductInfo(id)
        if (status === 0) this.setState({ProductInfo:data})
        else message.error(msg)
    }

    //获取商品所属分类名
    getCategoryName = (categoryId) => {
        const categoryList = this.props.categoryList
        if (categoryList.length !== 0) {
            let result = categoryList.find((item) => {
                return item._id === categoryId
            })
            if(result) return result.name
        } else this.props.saveCategoryList()
    }


    componentDidMount() {
        //组件一挂载便请求商品详细信息
        this.getProductDetail()
    }


    render() {
        const { name, desc, price, categoryId, imgs, detail } = this.state.ProductInfo
        return (
            <div>
                <Card
                    title={
                        <div>
                            <Button
                                onClick={() => { this.props.history.goBack() }}
                                type="link">
                                <ArrowLeftOutlined />
                            </Button>
                            商品详情
                        </div>
                    }
                >
                    <List
                        size="large"
                    >
                        <Item style={{ justifyContent:'left',paddingLeft:'45px'}}>
                            <span className="detail_title">商品名称：</span>
                            <span className="detail_content">{name}</span>
                        </Item>
                        <Item style={{ justifyContent:'left',paddingLeft:'45px'}}>
                            <span className="detail_title">商品描述：</span>
                            <span className="detail_content">{desc}</span>
                        </Item>
                        <Item style={{ justifyContent:'left',paddingLeft:'45px'}}>
                            <span className="detail_title">商品价格：</span>
                            <span className="detail_content">￥{price}</span>
                        </Item>
                        <Item style={{ justifyContent:'left',paddingLeft:'45px'}}>
                            <span className="detail_title">所属分类：</span>
                            <span className="detail_content">{this.getCategoryName(categoryId)}</span>
                        </Item>
                        <Item style={{ justifyContent:'left',paddingLeft:'45px'}}>
                            <span className="detail_title" >商品图片：</span>
                            {imgs.map((imgName) => {
                                return <img className="productImg" key={imgName} src={`/upload/${imgName}`} alt="商品图片"></img>
                            })}
                        </Item>
                        <Item style={{ justifyContent:'left',paddingLeft:'45px'}}>
                            <span className="detail_title">商品详情：</span>
                            <span
                                className="detail_content"
                                dangerouslySetInnerHTML={{ __html: detail }}
                            >
                            </span>
                        </Item>
                    </List>
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({
        categoryList:state.categoryList
    }),
    {
        saveCategoryList:createSaveCategoryListActionAsync
    }
)(ProductDetail)