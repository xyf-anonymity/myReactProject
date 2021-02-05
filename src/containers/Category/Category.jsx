import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card,Button,Table,Modal,Form,Input,message} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { createSaveCategoryListActionAsync } from '../../redux/actions/Category_action'
import {reqAddCategoryName,reqUpdateCategory} from '../../api'

const {Item} = Form

class Category extends Component {

    state = {
        visible: false
    }

    componentDidMount() {
        this.props.saveCategoryList() //组件挂载完毕后便请求商品分类列表
    }

    // 显示模态框
    showModal = async (categoryInfo) => {
        let { _id, name } = categoryInfo
        if (_id && name) { //进入此判断说明点击了修改分类
            this._id = _id
            this.name = name
            if(this.refs.form) this.refs.form.setFieldsValue({categoryName:name}) //重置输入框
            this.isUpdateCategory = true //变成修改分类模态框
        }
        this.setState({
          visible: true,
        })
      }
    
    //确定
    handleOk = async () => {
        let result   //提前声明请求结果
        const AddCategoryInfo = this.refs.form.getFieldValue()  //获取用户输入的商品分类名
        if (JSON.stringify(AddCategoryInfo) === '{}') {
            message.warning('表单输入有误，请检查')
            return
        }
        AddCategoryInfo.categoryName = AddCategoryInfo.categoryName.trim() //去除空格
        if (AddCategoryInfo.categoryName.length !== 0) {  //进入此判断说明用户输入框里有内容
            result = this.isUpdateCategory ? await reqUpdateCategory({    //如果模态框为修改分类发的请求
                categoryId: this._id,
                categoryName:AddCategoryInfo.categoryName
            }) : await reqAddCategoryName(AddCategoryInfo)  //模态框为新增分类的请求
        } else {
            message.warning('表单输入有误，请检查') 
            return
        }
        let { status,msg } = result
        if (status === 0) {
            this.props.saveCategoryList() //把数据保持到redux中
            this.handleCancel()
        } else  message.error(msg)  
    }
    
    //取消
    handleCancel = () => {
        this.refs.form.setFieldsValue({
            categoryName:undefined
        }) //重置输入框
        this.setState({  //隐藏模态框
          visible: false,
        })
        this.isUpdateCategory = false //变回新增分类模态框
      }

    render() {
        const columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                // dataIndex: 'name',
                key: 'operate',
                width: '20%',
                align:'center',
                render: (categoryInfo) => <Button type="link" onClick={()=>{this.showModal(categoryInfo)}}>修改分类</Button>
            },
        ];
        
        return (
            <div>
                <Card
                    extra={<Button type="primary" onClick={this.showModal}><PlusCircleOutlined />添加分类</Button>}
                >
                    <Table
                        bordered
                        dataSource={this.props.categoryList}
                        columns={columns}
                        rowKey="_id"
                        pagination={{
                            defaultPageSize:4,
                            showQuickJumper: true,
                            hideOnSinglePage:true
                        }}
                    />
                </Card>
                <Modal
                    title={this.isUpdateCategory ? "修改分类":"新增分类"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form
                        ref={'form'}
                        initialValues={{
                            categoryName:this.name
                        }}
                    >
                        <Item
                            name="categoryName"
                            rules={[{ required: true, message: '分类名必须输入' }]}
                        >
                            <Input placeholder="请输入分类名"/>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default connect(
    (state) => ({categoryList:state.categoryList}),
    {
        saveCategoryList:createSaveCategoryListActionAsync
    }
)(Category)