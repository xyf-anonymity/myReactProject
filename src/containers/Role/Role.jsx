import React, { Component } from 'react'
import {Button,Card,Table,Modal,Form,Input,message,Tree} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { reqGetRolesList, reqAddRole,reqSetRoleAuthority } from '../../api'
import menuArr from '../../config/menu_config.js'
const { Item } = Form

message.config({
    duration: 1,
    maxCount:1
})
export default class Role extends Component {

    state = {
        visible: false,
        setAuth:false,
        rolesList: [], //角色列表
        isLoading: true, //是否加载数据中
        menus: ['home'], //授权权限菜单列表
        _id:'' //角色ID
    }

    componentDidMount() {
        //组件一挂载就请求角色列表
        this.getRolesList()
    }

/* -----------------------------------------下面为新增角色的逻辑代码 */
    //显示新增角色的模态框
    showModal = () => {
        this.setState({visible:true})
    }
    // 点击新增角色的取消按钮
    handleCancel = () => {
        this.refs.form.resetFields()
        this.setState({visible: false})
    }
     //点击新增角色的确认按钮
    handleOk = async() => {
        let value = this.refs.form.getFieldsValue() //获取用户输入角色名
        if(!value.roleName) return
        value.roleName = value.roleName.trim()
        if (value.roleName !== "") {
            let {status,data,msg} = await reqAddRole(value)
            if (status === 0) {
                const rolesList = [...this.state.rolesList]
                data.create_time = dayjs(data.create_time).format('YYYY 年 MM 月 DD 日 HH:mm:ss')
                rolesList.push(data)
                this.setState({rolesList})
            } else message.error(msg)
        } else {
            message.warning('输入项不能为空')
            return
        }
        this.handleCancel() //重置表单，关闭模态框
    }
    //获取角色列表
    getRolesList = async() => {
        let { status, data, msg } = await reqGetRolesList()
        if (status === 0) {
            data.forEach((itemObj) => {
                itemObj.create_time = dayjs(itemObj.create_time).format('YYYY 年 MM 月 DD 日 HH:mm:ss')
            })
            this.setState({rolesList:data,isLoading:false})
        } else message.error(msg) 
    }

/* -----------------------------------------下面为设置权限的逻辑代码 */
    //显示设置权限的模态框
    showSetAuthModal = (_id) => {
        //进行授权菜单的数据回显
        let result = this.state.rolesList.find((itemObj) => {
             return itemObj._id === _id
        })
        if (result) {
            const { menus } = result
            if (menus.indexOf('home') === -1) menus.push('home')
            this.setState({setAuth:true,_id,menus})
        }    
    }

    //点击设置权限模态框的取消按钮
    handleSetAuthCancel = () => {
        this.setState({setAuth: false})
    }

    //点击设置权限模态框的确认按钮
    handleSetAuthOk = async() => {
        const {menus,_id} = this.state
        let {status,msg} = await reqSetRoleAuthority(_id, menus) //请求设置权限
        if (status === 0) {
            message.success('授权成功')
            this.getRolesList()
        } else message.error(msg)
        this.setState({setAuth: false})
    }

    //收集授权菜单并维护到状态里
    onCheck = (menus) => {
        this.setState({menus})
    }

    render() {
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                width:'20%'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                width:'25%'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render: auth_time => auth_time ? dayjs(auth_time).format('YYYY 年 MM 月 DD 日 HH:mm:ss') : '暂未授权'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'auth_name',
                align: 'center',
                render: auth_name => auth_name ? auth_name : '暂未授权'
            },
            {
                title: '操作',
                dataIndex: '_id',
                key: 'operation',
                align: 'center',
                width:'10%',
                render:(_id) => (<Button type="link" onClick={()=>{this.showSetAuthModal(_id)}}>设置权限</Button>)
            },
        ];

        const treeData = menuArr

        return (
            <div>  
                <Card
                    size="big"
                    title={
                        <Button
                            type='primary'
                            onClick={this.showModal}
                        >
                            <PlusOutlined/>
                            新增角色
                        </Button>
                    }
                >
                    <Table
                        bordered
                        dataSource={this.state.rolesList.reverse()}
                        columns={columns}
                        rowKey="_id"
                        pagination={{
                            pageSize: 4,
                            showQuickJumper:true
                        }}
                        loading={this.state.isLoading}
                    />
                </Card>
                <Modal
                    title="新增角色"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form
                        ref="form"
                    >
                        <Item
                            name="roleName"
                            rules={[{
                                required: true,
                                message:"角色名必须输入"
                            }]}
                        >
                            <Input placeholder="请输入角色名"/>
                        </Item>
                    </Form>
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.setAuth}
                    onOk={this.handleSetAuthOk}
                    onCancel={this.handleSetAuthCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Tree
                        checkable
                        treeData={treeData}
                        defaultExpandAll={true}
                        SelectedKeys={["home"]}
                        checkedKeys={this.state.menus}
                        onCheck={this.onCheck}
                    />
                </Modal>
            </div>
        )
    }
}