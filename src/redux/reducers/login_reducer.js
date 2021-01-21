import { USERS_LOGIN_INFO , USERS_LOGOUT_INFO} from '../action_types'
let user = JSON.parse(localStorage.getItem('user'))
let token = localStorage.getItem('token')
let initState = {
    user: user || '',
    token: token || '',
    isLogin: user && token ? true : false
}
export default function operateTest(perState=initState,action) {
    let { type, data } = action
    // let {user,token} = data
    let newState
    switch (type) {
        case USERS_LOGIN_INFO:
            newState = {
                user: data.user,
                token: data.token,
                isLogin: true
            }
            return newState
        case USERS_LOGOUT_INFO:
            newState = {
                user:'',
                token:'',
                isLogin: false
            }
            return newState
        default:
            return perState
    }
}