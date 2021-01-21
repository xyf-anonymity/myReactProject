//用于项目发送请求的模块
import myAxios from './myAxios'  //封装一个用于发送请求的axios
import jsonp from 'jsonp'
import {BASE_URL,WEATHER_URL,LOCATION,AK} from '../config'

// 登录请求
export const reqLogin = values => myAxios.post(`${BASE_URL}/login`, values)

// 获取天气信息的请求
export const reqWeather = () => {
    jsonp(`${WEATHER_URL}?location=${LOCATION}&output=json&ak=${AK}`, (err,data) => {
        console.log(err,data)
    })
}

// 获取商品分类列表的请求
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)