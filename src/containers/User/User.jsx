import React, { Component } from 'react'
import {Card,Button,Table,message,Modal,Form,Input,Select} from 'antd'
import { PlusOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { reqGetUserList,reqAddUser,reqUpdateUser,reqDeleteUser} from '../../api'

const { Item } = Form
const {Option} = Select
export default class User extends Component {

    state = {
        visible: false, //是否显示模态框
        userList: [], //用户列表
        roles: [], //角色列表
        isLoading: true, //是否加载中
        isUpdate: false, //是否是修改用户
        userId:''  //用户 ID
    }

    //点击提醒是否删除用户的模态框
    confirm = (userId) => {
        this.setState({userId})
        Modal.confirm({
            title: '确定要删除该用户吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {      //删除用户
                const { userId } = this.state
                let { status, msg } = await reqDeleteUser(userId)
                if (status === 0) {
                    message.success('删除用户成功')
                    this.getUserList()  //请求用户列表
                } else message.error(msg)
            }
        })
      }

    //显示模态框
    showModal = (userId) => {
        if (userId) {
            const {userList} = this.state
            let userAgainShowInfo = userList.find((userObj) => {
                return userObj._id === userId
            }) 
            this.setState({ visible: true, isUpdate: true ,userId}, () => {
                this.refs.form.setFieldsValue(userAgainShowInfo)  //点击修改用户的数据回显
            })
        } else this.setState({visible:true})
    }

    // 添加或者修改用户的请求
    addOrUpdateUser = async (userInfo) => {
        const { isUpdate,userId } = this.state 
        if(isUpdate) userInfo._id = userId
        let {status,msg} = isUpdate ? await reqUpdateUser(userInfo) : await reqAddUser(userInfo)
        if (status === 0) {
            message.success(isUpdate ? '修改用户成功' : '添加用户成功')
            this.getUserList()  //请求用户列表
            this.handleCancel() //重置表单并隐藏模态框
        } else message.error(msg)
    }

    //点击确认按钮
    handleOk = () => {
        const {roles,isUpdate} = this.state
        let value = this.refs.form.getFieldsValue()  //获取新增用户的信息
        let { username, password, role_id } = value
        console.log(isUpdate,password)
        if(username !== undefined) username = username.trim()
        if(password !== undefined) password = password.trim()
        if (role_id !== undefined) role_id = role_id.trim()
        if (isUpdate) password = true
        if (username && password && role_id) {
            roles.forEach((roleObj) => {
                if(roleObj.name === value.role_id) value.role_id = roleObj._id
            })
            this.addOrUpdateUser(value)  //发送添加用户的请求
        } else  this.refs.form.validateFields() //触发表单验证
    }
  
    //点击取消按钮
    handleCancel = () => {
        this.setState({ visible: false,isUpdate:false })
        this.refs.form.resetFields()
    }
  
    //获取用户列表
    getUserList = async() => {
        let { status, data, msg } = await reqGetUserList()
        if (status === 0) {
            const { users, roles } = data
            users.forEach((userObj) => {
                userObj.create_time = dayjs(userObj.create_time).format('YYYY 年 MM 月 DD 日 HH:mm:ss')
                roles.forEach((roleObj) => {
                    if(userObj.role_id === roleObj._id) userObj.role_id =  roleObj.name
                })
            })
            this.setState({ userList:users,roles,isLoading:false})
        }
        else message.error(msg)
    }

    componentDidMount() {
        this.getUserList() //组件一挂载就请求用户列表
    }

    render() {
        const {isLoading,userList,isUpdate,visible} = this.state
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
                width:"20%"
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
            },
            {
                title: '操作',
                key: 'operation',
                align: 'center',
                width:'15%',
                render: (userInfo) => (
                    <div>
                        <Button type="link"  onClick={()=>{this.showModal(userInfo._id)}}>修改</Button>
                        &nbsp;
                        <Button type="link" onClick={()=>{this.confirm(userInfo._id)}}>删除</Button>
                    </div>
                )
            },
        ];
        return (
            <div>
                <Card
                    title={
                        <Button
                            type='primary'
                            onClick={()=>{this.showModal()}}
                        >
                            <PlusOutlined/>
                            创建用户
                        </Button>
                    }
                >
                    <Table
                        bordered
                        dataSource={userList.reverse()}
                        columns={columns}
                        rowKey="_id"
                        pagination={{
                            pageSize: 3,
                            showQuickJumper: true
                        }}
                        loading={isLoading}
                    />
                </Card>
                <Modal
                    title={isUpdate ? "修改用户" : "添加用户"}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form
                        ref="form"
                        initialValues={{role_id: ""}}
                        labelAlign="right"
                        labelCol={{
                            offset: 1,
                            span:4
                        }}
                    >
                        <Item
                            label="用户名"
                            name="username"
                            wrapperCol={{
                                span:15
                            }}
                            rules={[
                                {
                                required: true,
                                message: '请输入您的用户名',
                            },
                                {
                                max:12,
                                message: '必须小于等于12位',
                            },
                                {
                                min: 4,
                                message:'必须大于等于4位'
                            },
                                {
                                pattern:/^\w+$/,
                                message:'必须是英文、数字或下划线组成'
                            }
                            ]}
                        >
            
                            <Input placeholder="请输入用户名"/>
                        </Item> 
                        {
                            isUpdate || (<Item
                            label="密码"
                            name="password"
                            wrapperCol={{
                                span:15
                            }}
                            rules={[
                                {
                                required: true,
                                message: '请输入您的密码',
                            },
                                {
                                max:12,
                                message: '必须小于等于12位',
                            },
                                {
                                min: 4,
                                message:'必须大于等于4位'
                            },
                                {
                                pattern:/^\w+$/,
                                message:'必须是英文、数字或下划线组成'
                            }
                            ]}
                        >
                            <Input placeholder="请输入密码"/>
                        </Item>)
                        }
                        <Item
                            label="手机号"
                            name="phone"
                            wrapperCol={{
                                span:15
                            }}
                            rules={[
                                {
                                pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                                message:'必须是正确格式的手机号'
                            }
                            ]}
                        >
                            <Input placeholder="请输入您的手机号"/>
                        </Item> 
                        <Item
                            label="邮箱"
                            name="email"
                            wrapperCol={{
                                span:15
                            }}
                            rules={[
                                {
                                pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                                message:'必须是正确格式的邮箱'
                            }
                            ]}
                        >
                            <Input placeholder="请输入您的邮箱"/>
                        </Item> 
                        <Item
                            label="角色"
                            name="role_id"
                            wrapperCol={{
                                span:15
                            }}
                            rules={[{
                                required: true,
                                message:"必须选择一个角色"
                            }]}
                        >
                             <Select>   
                                <Option value="">请选择一个角色</Option>
                                {
                                    this.state.roles.map((itemObj) => {
                                        return <Option value={itemObj.name} key={itemObj._id}>{itemObj.name}</Option>
                                    })
                                }
                            </Select>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}