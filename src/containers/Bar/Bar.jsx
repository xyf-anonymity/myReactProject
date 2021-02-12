import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {

    getOption = () => {

        return (
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['蒸发量', '降水量', '平均温度']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '总销售额',
                        min: 0,
                        max: 5000,
                        interval: 1000,
                        axisLabel: {
                            formatter: '{value} 万'
                        }
                    },
                    {
                        type: 'value',
                        name: '总利润',
                        min: 0,
                        max: 2000,
                        interval: 500,
                        axisLabel: {
                            formatter: '{value} 万'
                        }
                    }
                ],
                series: [
                    {
                        name: '蒸发量',
                        type: 'bar',
                        data: [4560, 4230, 3950, 3560, 4123, 4569, 3658, 4569, 3921, 3895, 4756, 4555]
                    },
                    {
                        name: '平均温度',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [1123, 745, 778, 637, 874, 913, 795, 1320, 899, 778, 1345, 1235]
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