import { combineReducers } from 'redux'
import loginReducer from './login_reducer'
import leftNavReducer from './left_nav_reducer'

export default combineReducers({
    userInfo: loginReducer,
    title:leftNavReducer
})
