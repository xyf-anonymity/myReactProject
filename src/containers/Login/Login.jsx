import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createSaveUserInfoAction} from '../../redux/actions/Login_action.js'
import { Form,Input,Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import LOGO from '../../static/imgs/logo.png'
import './css/login.css'
const { Item } = Form

 class Login extends Component {
     
    //自定义验证登录名和密码
    validator = (rule,value) => {
        let length = value&&value.length
        const pwdReg = /^\w+$/
        if (!value) {
            return Promise.reject('请输入您的密码') 
        } else if (length <= 4) {
            return Promise.reject('必须大于等于4位')
        } else if (length >= 12) {
            return  Promise.reject('必须小于等于12位')
        } else if (!pwdReg.test(value)) {
            return Promise.reject('必须是英文、数字或下划线组成')
        } else return Promise.resolve()
        
    }
     

    //点击登录按钮处理的函数
    onFinish = async (values) => {
        // console.log(values);
        let result = await reqLogin(values)
        let {status,msg,data} = result
        if (status === 0 ) {  //用户名和密码正确跳转页面
            //分发action 把请求回来的用户信息保存到redux中统一管理
            this.props.saveUserInfo(data)
            //跳转到admin页面
            this.props.history.replace('/admin')
            message.success('登录成功',1)
        } else  message.warning(msg,1)  //用户名和密码错误弹窗体醒
    
    }
    

    render() {
        const { isLogin } = this.props.userInfo
        // 用户已经登录过的情况下，跳转到admin页面
        if (isLogin) return <Redirect to="admin"/>
        return (
            <div className='bg'>
                <header>
                    <img className='logo' src={LOGO} alt="LOGO" />
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    <div>
                        <Form name="normal_login" className="login-form" initialValues={{
                            remember: true,
                        }} onFinish={this.onFinish}>
                            <Item name="username" rules={[
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
                            ]}>
                                <Input
                                    prefix={<UserOutlined
                                    className="site-form-item-icon" />}
                                    placeholder="用户名"
                                />
                            </Item>
                            <Item name="password" rules={[{validator:this.validator}]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                                </Button>
                            </Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}


export default connect(
    state => ({userInfo : state.userInfo}),
    {
        saveUserInfo: createSaveUserInfoAction,   //调用函数分发action
    }
)(Login)


