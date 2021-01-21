import axios from 'axios'
import store from '../redux/store.js'
import qs from 'querystring'
import NProgress from 'nprogress'
import { message } from 'antd'
import {createDeleteUserInfoAction} from '../redux/actions/Login_action'
import 'nprogress/nprogress.css'
// import '@tanem/react-nprogress/dist/'
const instance = axios.create({
    timeout: 1000
})
//请求拦截器
instance.interceptors.request.use(config => {
    //进度条开始
    NProgress.start()
    let { method, data, headers } = config
    
    // 携带token进行验证
    let { token } = store.getState().userInfo
    if (token)  headers.Authorization = 'xyf_project' + token
    
    //若是post请求
    if (method.toLowerCase() === 'post') {
            // 如若请求体参数是JSON格式
        if (data instanceof Object) config.data = qs.stringify(data) //把post请求的请求体参数转为一个urlencoded格式的参数
        
    }
    return config    
})

//响应拦截器
instance.interceptors.response.use(
    response => {
        NProgress.done() //进度条结束
        return response.data
},
    error => {
        let { status } = error.response
        NProgress.done() //进度条结束
        if (status === 401) {
            message.error('身份验证过期，请重新登录！',2)
            store.dispatch(createDeleteUserInfoAction())
        } else message.error(`请求出错 ${error.message}`, 2)
        
        return new Promise(()=>{}) //中断 promise链
})


export default instance