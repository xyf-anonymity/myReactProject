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
                    text: '商品各类别销量统计',
                    subtext: '虚构数据',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: this.state.productCategory
                },
                toolbox: {
                    feature: {
                        saveAsImage:{}
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: [
                            {value:7350, name: '智能手表'},
                            {value:15480, name: '洗护用品'},
                            {value:5100, name: '汽车用品'},
                            {value:4340, name: '宠物用品'},
                            {value:1335, name: '办公用品'},
                            {value:13335, name: '商务服饰'},
                            {value:9335, name: '奢华箱包'},
                            {value:8465, name: '女士护肤'},
                            {value:5335, name: '耳机音响'},
                            {value:6335, name: '台式电脑'},
                            {value:7335, name: '笔记本电脑'},
                            {value:8335, name: 'IT书籍'},
                            {value:9335, name: '智能手机'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
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