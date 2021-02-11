import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {

    getOption = () => {
        return (
            {
                title: {
                    text: '天气情况统计',
                    subtext: '虚构数据',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: ['西凉', '益州', '兖州', '荆州', '幽州']
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
                            {value:1548, name: '幽州'},
                            {value: 735, name: '荆州'},
                            {value: 510, name: '兖州'},
                            {value: 434, name: '益州'},
                            {value: 335, name: '西凉'}
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