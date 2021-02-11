import React, { Component } from 'react'
import { Card, Button,Select,Input,Table,message} from 'antd'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { reqProductList,reqOperateProductStatus,reqSearchProductList} from '../../api'
import {PAGE_SIZE} from '../../config'

const { Option } = Select
message.config({
    duration: 1,
    maxCount: 1,
  })
export default class Product extends Component {

    state = {
        productList: [],
        total: 0,
        searchContent:'',
        searchType:'productName',
        isLoading: true,
        isSearch:false
    }

    //获取商品列表的函数
    getProductList = async (page) => {
        if (this.state.isSearch) {
            this.search(page)
        } else {
            let result = await reqProductList(page, PAGE_SIZE)
            let {status,msg,data} = result
            if (status === 0) {
                const { total, list } = data
                this.setState({productList:list,total,isLoading:false})
            } else {
                message.error(msg)
            }
        }   
    }
    //用于操作商品状态进行上架下架商品的函数
    operateProdStatus = async(prodInfo) => {
        const { _id } = prodInfo
        let state = prodInfo.status === 1 ? 2 : 1
        let { status,msg } = await reqOperateProductStatus(_id,state)
        if (status === 0) {
            message.success('操作成功！',2)
            const { productList } = this.state
            productList.forEach((item) => {
                if(item._id === _id) item.status = state
            })
            this.setState({productList})
        } else {
            message.error(msg)
        }
    }

    handleChange = (value) => {
        this.setState({searchType:value.value})
    }

    handleInput = (event) => {
        this.setState({ searchContent:event.target.value })
    }

    //搜索商品的函数
    search = async (page) => {
        this.page = page
        this.setState({isSearch:true})
        const {searchType, searchContent} = this.state
        let { status, data, msg } = await reqSearchProductList(searchType, searchContent, page, PAGE_SIZE)
        if (status === 0) {
            const {list,total} = data
            this.setState({productList:list,total,isLoading:false})
        } else {
            message.error(msg)
        }       
    }

    redirectProductDetail = (id) => {
        this.props.history.push(`/admin/prod_about/product/detail/${id}`)
    }

    redirectProductUpdateOrAdd = (id) => {
        this.props.history.push(`/admin/prod_about/product/updateProduct/${id}`)
    }
  
    componentDidMount() {
        //一上来就请求商品列表
        this.getProductList(1)
     }

    render() {
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
                width:"20%"
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
                width:"50%"
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                width: "10%",
                align: "center",
                render:(price) => '￥' + price
            },
            {
                title: '状态',
                // dataIndex: 'status',
                key: 'status',
                width: "10%",
                align: "center",
                render: (prodInfo) => (
                    <div>
                        <Button
                            onClick={() => { this.operateProdStatus(prodInfo) }}
                            type={prodInfo.status === 1 ? "danger" : "primary"}
                        >
                            {prodInfo.status === 1 ? "下架" : "上架"}
                        </Button><br />{prodInfo.status === 1 ? "在售" : "已停售"}
                    </div>
                )
            },
            {
                title: '操作',
                dataIndex: '_id',
                key: 'operation',
                width: "10%",
                align: "center",
                render: (id) => (
                    <div>
                        <Button onClick={()=>{this.redirectProductDetail(id)}} type="link">详情</Button>
                        <br/>
                        <Button onClick={()=>{this.redirectProductUpdateOrAdd(id)}} type="link">修改</Button>
                    </div>
                )
            },
        ]
        return (
            <Card
                title={
                    <div>
                        <Select
                            labelInValue
                            defaultValue={{ value: 'productName' }}
                            onChange={this.handleChange}
                        >
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input
                            placeholder="请输入搜索关键字"
                            style={{ width: "180px", marginLeft: "10px", marginRight: "10px" }}
                            onChange={this.handleInput}
                        />
                        <Button type="primary" onClick={()=>{this.search(1)}}><SearchOutlined />搜索</Button>
                    </div>
                }
                extra={
                    <Button type="primary" onClick={()=>{this.props.history.push('/admin/prod_about/product/addProduct')}}>
                        <PlusCircleOutlined />
                        添加商品
                    </Button>}
            >
                <Table
                    dataSource={this.state.productList}
                    columns={columns}
                    bordered
                    rowKey="_id"
                    loading={this.state.isLoading}
                    pagination={{
                        current:this.page,
                        pageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        total: this.state.total,
                        onChange: (page) => {
                            this.page = page
                            this.getProductList(page)
                        }
                    }}
                />
          </Card>
        )
    }
}