import React, { Component } from 'react'
import './css/home.css'
export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div id="wrapper" contenteditable="true" spellcheck="false">
                    <div>欢迎使用本商品管理系统</div>
                </div>
            </div>
        )
    }
}