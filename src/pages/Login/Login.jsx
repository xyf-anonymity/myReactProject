import React, { Component } from 'react'
import { Form,Input,Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LOGO from './images/logo.png'
import './css/login.css'
const {Item} = Form
export default class Login extends Component {


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
        } else {
            return Promise.resolve()
        }
    }

    render() {
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
                        }} >
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
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Item>
                            <Item name="password" rules={[
                                {validator:this.validator}
                                ]}>
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                                />
                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" >
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