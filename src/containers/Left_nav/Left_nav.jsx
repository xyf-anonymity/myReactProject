import React, { Component } from 'react'
import { Menu } from 'antd';
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {createSaveTitleAction} from '../../redux/actions/Left_nav_action.js'
import menuData from '../../config/menu_config.js'
import logo from '../../static/imgs/logo.png'
import './css/Left_nav.less'

const { SubMenu,Item } = Menu


class LeftNav extends Component {

    getTitle = (title) => {
        this.props.saveTitle(title)
    }

    createNavMenu = (menuArr) => {
        return menuArr.map(menuObj => {
            if (menuObj.children instanceof Array) {
                return (
                    <SubMenu key={menuObj.key} icon={<menuObj.icon />} title={menuObj.title}>
                        {this.createNavMenu(menuObj.children)}
                    </SubMenu>
                ) 
            } else {
                let title = menuObj.title
                return (
                    <Item key={menuObj.key} icon={< menuObj.icon />} onClick={()=>{this.getTitle(title)}}>
                        <NavLink to={menuObj.path}>
                            {title}
                        </NavLink>
                    </Item>
                )
            }
        })
    }

    saveUrlTitle = () => {
        let key = this.props.location.pathname.split('/').reverse()[0]
        if(key === 'admin') key = 'home'
        menuData.forEach((menuObj) => {
            if (menuObj.children instanceof Array) {
                let result = menuObj.children.find((childrenObj) => {
                    return childrenObj.key === key
                })
                if(result) this.props.saveTitle(result.title)
            } else {
                if (menuObj.key === key) {
                    this.props.saveTitle(menuObj.title)
                }
            }         
        })
    }

    componentDidMount() {
        //获取浏览器地址栏中与 menuData 中相匹配的key，把 key 所在对象的 title 存在 redux 中 ，目的是为了刷新页面时 header组件中的 {title} 保持不变
        this.saveUrlTitle()
    }

    render() {
        let pathArr = this.props.location.pathname.split('/')
        let key = pathArr.reverse()[0]
        if (key === 'admin') key = 'home'
        return (
            <div>
                <div className="nav_header">
                    <img src={logo} alt="" />
                    <h1>商品管理系统</h1>
                </div>
                <div className="nav_menu">
                    <Menu
                        selectedKeys={[key]}
                        defaultOpenKeys={pathArr}
                        mode="inline"
                        theme="dark"
                    >
                        {this.createNavMenu(menuData)}   
                    </Menu>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {
        saveTitle: createSaveTitleAction
    }
)(withRouter(LeftNav)) 

