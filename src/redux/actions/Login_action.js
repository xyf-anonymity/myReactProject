import {USERS_LOGIN_INFO,USERS_LOGOUT_INFO} from '../action_types'
export const createSaveUserInfoAction = (value) => {
    //把请求回来的数据存储到浏览器的localStorage当中,实现免登录
    let {token,user} = value
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)
    localStorage.setItem('isLogin',true)
    return {type:USERS_LOGIN_INFO,data:value}
}

export const createDeleteUserInfoAction = () => {
    // localStorage.removeItem('token')
    // localStorage.setItem('isLogin',false)
    localStorage.clear()
    return {type:USERS_LOGOUT_INFO}
    
}