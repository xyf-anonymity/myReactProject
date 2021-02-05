import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card,Button,Form,Input,Select, message} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { createSaveCategoryListActionAsync } from '../../redux/actions/Category_action'
import {reqAddProductInfo,reqGetProductInfo,reqUpdateProductInfo} from '../../api'
import PictureWall from './Picture_wall/Picture_wall.jsx'  //上传图片组件
import RichText from './Rich_text/Rich_text.jsx' //富文本编辑器 

const {Item} = Form
const {Option} = Select

class ProductUpdateOrAdd extends Component {

    state = {
        isUpdate: false,
    }

    //点击提交后收集数据并发送修改或者添加商品的请求
    onFinish = (value) => {
        const { categoryList } = this.props
        let result = categoryList.find((itemObj) => {
            return itemObj.name === value.categoryId
        })
        value.categoryId = result._id
        value.detail = this.refs.richText.getDescText() //搜集富文本编辑器的数据
        value.imgs = this.refs.pictureWall.getPictureName() //搜集上传的图片名
        delete value.picture  //删除对象中一个元素
        this.addOrUpdateProductInfo(value)
    }

    //发送添加商品或者修改商品的请求
    addOrUpdateProductInfo = async (value) => {
        const {isUpdate} = this.state
        if(isUpdate) value._id = this.props.match.params.id
        let {status,msg} = isUpdate ? await reqUpdateProductInfo(value) : await reqAddProductInfo(value)
        if (status === 0) {
            message.success('操作成功')
            this.refs.form.resetFields()
            this.props.history.goBack()
        }  else message.error(msg)
    }

    //获取商品详情的请求
    getProductDetail = async(productId) => {
        let {status,data,msg} = await reqGetProductInfo(productId)  //请求商品详情
        if (status === 0) {
            const { categoryList } = this.props
            let result = categoryList.find((itemObj) => {
                return itemObj._id === data.categoryId
            })
            if(result) data.categoryId = result.name
            this.refs.form.setFieldsValue(data)  //修改商品时，回显商品数据
            this.refs.pictureWall.pictureAgainShow(data.imgs) //修改商品时，回显商品图片
            this.refs.richText.productDetailInfoBackToDraft(data.detail) //修改商品时 回显商品详情
        } else message.error(msg)
    }

    componentDidMount() {
        if (!this.props.categoryList.length) this.props.saveCategoryList()
        let mark = this.props.location.pathname.split('/').reverse()[0]  //挂载组件时判断是要更新商品还是修改商品
        if (mark !== 'addProduct') {  //点击修改商品进入此判断
            this.setState({ isUpdate: true })
            let productId = this.props.match.params.id
            this.getProductDetail(productId)  //数据回显
        }
    }


    render() {
        const {categoryList} = this.props
        const {isUpdate} = this.state
        return (
            <div>
                <Card title={<div> <Button onClick={() => { this.props.history.goBack() }} type="link"><ArrowLeftOutlined /></Button>{isUpdate ? '商品修改' :'商品添加'}</div>}>
                    <Form
                        ref='form'
                        labelCol={{
                        offset: 1,
                        }}
                        initialValues={{ categoryId: "" }}
                        onFinish={this.onFinish}
                    >
                        <Item
                            label="商品名称"
                            name="name"
                            labelAlign="left"
                            rules={[{required:true,message:"请输入商品名称"}]}
                            wrapperCol={{
                                span: 8
                            }}
                        >
                            <Input placeholder="商品名称"/>
                        </Item>
                        <Item
                            label="商品描述"
                            name="desc"
                            labelAlign="left"
                            rules={[{required:true,message:"请输入商品描述"}]}
                            wrapperCol={{
                                span: 8
                            }}
                        >
                            <Input placeholder="商品描述"/>
                        </Item>
                        <Item
                            label="商品价格"
                            name="price"
                            labelAlign="left"
                            rules={[{required:true,message:"请输入商品价格"}]}
                            wrapperCol={{
                                span: 8
                            }}
                        >
                            <Input
                                type="number"
                                addonBefore="￥"
                                addonAfter="元"
                                placeholder="商品价格"
                            />
                        </Item>
                        <Item
                            label="商品分类"
                            name="categoryId"
                            labelAlign="right"
                            rules={[{required:true,message:"请添加商品分类"}]}
                            wrapperCol={{
                                span: 8
                            }}
                        >
                             <Select > 
                                <Option value="">请选择商品分类</Option>
                                {categoryList.map((itemObj) => {
                                    return <Option value={itemObj.name} key={itemObj._id}>{itemObj.name}</Option>
                                })}
                            </Select> 
                        </Item>
                        <Item
                            style={{marginLeft:"10px"}}
                            label="商品图片"
                            name="picture"
                        >
                            <span><PictureWall ref="pictureWall"/></span>
                        </Item>
                        <Item
                            style={{marginLeft:"10px"}}
                            label="商品详情"
                            name="detail"
                            wrapperCol={{
                                span: 14,
                            }}
                        >
                            <span><RichText ref="richText"/></span>
                        </Item>    
                        <Item>
                            <Button style={{marginLeft:"60px"}} htmlType="submit" type="primary">提交</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({categoryList:state.categoryList}),
    {
        saveCategoryList:createSaveCategoryListActionAsync
    }
)(ProductUpdateOrAdd)