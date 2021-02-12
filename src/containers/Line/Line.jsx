import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {

    state = {
        productCategory:['智能手表','洗护用品','汽车用品','宠物用品','办公用品','商务服饰','奢华箱包','女士护肤','耳机音响','台式电脑','笔记本电脑','IT书籍','智能手机']
    }

    getOption = () => {

        return (
            {
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.state.productCategory
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '洗护用品',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '汽车用品',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '宠物用品',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '办公用品',
                        type: 'line',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    },
                    {
                        name: '商务服饰',
                        type: 'line',
                        stack: '总量',
                        data: [720, 256, 560, 934, 650, 750, 456]
                    },
                    {
                        name: '奢华箱包',
                        type: 'line',
                        stack: '总量',
                        data: [722, 330, 462, 870, 600, 750, 400]
                    },
                    {
                        name: '女士护肤',
                        type: 'line',
                        stack: '总量',
                        data: [730, 365, 363, 820, 920, 780, 600]
                    },
                    {
                        name: '耳机音响',
                        type: 'line',
                        stack: '总量',
                        data: [650, 450, 985, 560, 462, 467, 560]
                    },
                    {
                        name: '台式电脑',
                        type: 'line',
                        stack: '总量',
                        data: [780, 650, 782, 560, 475, 569, 560]
                    },
                    {
                        name: '笔记本电脑',
                        type: 'line',
                        stack: '总量',
                        data: [890, 546, 750, 456, 750, 745, 605]
                    },
                    {
                        name: 'IT书籍',
                        type: 'line',
                        stack: '总量',
                        data: [560, 546, 654, 756, 645, 530, 546]
                    },
                    {
                        name: '智能手机',
                        type: 'line',
                        stack: '总量',
                        data: [975, 750, 786, 655, 785, 777, 685]
                    },
                ]
            }
        )
    }

render() {
    return (
        <div style={{marginTop:'100px'}}><ReactEcharts option={this.getOption()} /></div>
    )
}
}