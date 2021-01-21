import React, { Component } from 'react'
import {reqCategoryList} from '../../api/index'
export default class Category extends Component {

    test = async() => {
        let result = await reqCategoryList()
        console.log(result)
    }


    render() {
        return (
            <div>
                <div>Category</div>
                <button onClick={this.test}>获取分类列表</button>
            </div>
        )
    }
}