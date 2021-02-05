import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd';
import Header from '../Header/Header.jsx' //头部
import LeftNav from '../Left_nav/Left_nav.jsx' //左侧菜单和 logo

import Home from '../Home/Home.jsx' //首页
import Category from '../Category/Category.jsx' //分类管理
import Product from '../Product/Product.jsx' //商品管理
import ProductDetail from '../Product_detail/Product_detail.jsx'
import ProductUpdateOrAdd from '../Product_update_or_add/Product_update_or_add.jsx'
import User from '../User/User' //用户管理 
import Role from '../Role/Role.jsx' //角色管理
import Bar from '../Bar/Bar.jsx' //柱形图
import Line from '../Line/Line.jsx' //折线图
import Pie from '../Pie/Pie.jsx' //饼图

import { createDeleteUserInfoAction } from '../../redux/actions/Login_action.js'
import './css/admin.css'

const { Footer, Sider, Content } = Layout;


class Admin extends Component {
     
    render() {
        let {isLogin} = this.props.userInfo
        //若登录
        if (isLogin) {
            return (
                <Layout className="admin">
                    <Sider className="admin_sider">
                        <LeftNav/>
                    </Sider>
                    <Layout className="right_section">
                        <Header/>
                        <Content className="content">
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/prod_about/category" component={Category} />
                                <Route path="/admin/prod_about/product" exact component={Product} />
                                <Route path="/admin/prod_about/product/detail/:id" component={ProductDetail} />
                                <Route path="/admin/prod_about/product/updateProduct/:id" component={ProductUpdateOrAdd} />
                                <Route path="/admin/prod_about/product/addProduct" component={ProductUpdateOrAdd} />
                                <Route path="/admin/user" component={User} />
                                <Route path="/admin/role" component={Role} />
                                <Route path="/admin/charts/bar" component={Bar} />
                                <Route path="/admin/charts/line" component={Line} />
                                <Route path="/admin/charts/pie" component={Pie} />
                                <Redirect to="/admin/home"/>
                            </Switch>
                        </Content>
                        <Footer>
                            <span>推荐使用 Chrome 浏览器,可以获得更佳页面操作体验</span>
                        </Footer>
                    </Layout>
                </Layout>
            )
        } else  return <Redirect to="/login"/> //若未登录
    }
}

 
export default connect(
    state => ({ userInfo: state.userInfo }),
    {
        deleteUserInfo:createDeleteUserInfoAction,
    }
)(Admin)