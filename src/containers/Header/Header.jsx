import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd';
import screenFull from 'screenfull'
import dayJs from 'dayjs'
import { createDeleteUserInfoAction } from '../../redux/actions/Login_action.js'
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import './css/Header.css'

const { confirm } = Modal;


class Header extends Component {

    state = {
        isFull: false,
        date:dayJs().format('YYYY年 M 月 DD 日 HH:mm:ss')
    }

    // 点击全屏展示页面
    fullScreen = () => {
        if (screenFull.isEnabled) {
            let isFull = !this.state.isFull
            screenFull.toggle()
            this.setState({isFull})
        }
    }

    //点击退出登录
    logout = () => {
        confirm({
            title: '确定要退出吗?',
            icon: <ExclamationCircleOutlined />,
            content: '退出后需要重新登录',
            okText: '确定',
            cancelText:'取消',
            onOk:() => {
                this.props.logOut()
            },
        })       
    }

/*     getWeather = async() => {
        reqWeather()
       let result =  reqWeather()
        console.log(result) 
    }  */

    componentDidMount() {
        //组件挂载完成后开启定时器显示时间
        this.timer = setInterval(() => {
            this.setState({date:dayJs().format('YYYY年 M 月 DD 日 HH:mm:ss')})
        }, 1000) 
        //请求天气信息
        // this.getWeather()
        
    }

    componentWillUnmount() {
        // 组件卸载后
        clearInterval(this.timer)  //清除定时器
    }

    render() {
        const { username , title} = this.props
        const {date} = this.state
        return (
            <div>
                <div className="header_top">
                    <Button size="small" onClick={this.fullScreen}>
                        {this.state.isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined /> }  
                    </Button>
                    <span className="username"> 欢迎，{username}</span>
                    <Button type="link" onClick={this.logout}>退出登录</Button>
                </div>
                <div className="header_bottom">
                    <div className="bottom_left">
                        <h1>{title}</h1>
                    </div>
                    <div className="bottom_right">
                        <span>{date}</span>
                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723476239,2504378195&fm=26&gp=0.jpg" alt="天气图标"/>
                        <span>多云 18~10 C°</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        username: state.userInfo.user.username,
        title:state.title
    }),
    {logOut : createDeleteUserInfoAction}
)(Header)

