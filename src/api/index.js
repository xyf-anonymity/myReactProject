//用于项目发送请求的模块
import myAxios from './myAxios'  //封装一个用于发送请求的axios
// import jsonp from 'jsonp'
import store from '../redux/store'
import {BASE_URL} from '../config'

// 登录请求
export const reqLogin = values => myAxios.post(`${BASE_URL}/login`, values)
// 获取天气信息的请求
// export const reqWeather = () => {jsonp(`${WEATHER_URL}?location=${LOCATION}&output=json&ak=${AK}`, (err,data) => {})}
// 获取商品分类列表的请求
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)
//添加一个商品分类的请求
export const reqAddCategoryName = (AddCategoryInfo) => myAxios.post(`${BASE_URL}/manage/category/add`, AddCategoryInfo)
//修改一个分类的请求
export const reqUpdateCategory = (updateCategoryInfo) => myAxios.post(`${BASE_URL}/manage/category/update`, updateCategoryInfo) 
//获取商品列表的请求
export const reqProductList = (pageNum, pageSize) => myAxios.get(`${BASE_URL}/manage/product/list`, { params: { pageNum, pageSize } })
//请求上架下架商品
export const reqOperateProductStatus = (productId, status) => myAxios.post(`${BASE_URL}/manage/product/updateStatus`, { productId, status })
//搜索商品列表的请求
export const reqSearchProductList = (searchType, searchContent, pageNum, pageSize) => myAxios.get(`${BASE_URL}/manage/product/search`, { params: { [searchType]: searchContent, pageNum, pageSize } })
//根据商品ID获取商品详细信息
export const reqGetProductInfo = (productId) => myAxios.get(`${BASE_URL}/manage/product/info`, { params: { productId } })
//请求删除商品图片
export const reqDeleteProductPicture = (name) => myAxios.post(`${BASE_URL}/manage/img/delete`, { name })
//请求添加商品
export const reqAddProductInfo = (productInfoObj) => myAxios.post(`${BASE_URL}/manage/product/add`, productInfoObj)
//请求修改商品
export const reqUpdateProductInfo = (productInfoObj) => myAxios.post(`${BASE_URL}/manage/product/update`, productInfoObj)
//请求获取角色列表
export const reqGetRolesList = () => myAxios.get(`${BASE_URL}/manage/role/list`)
//请求添加角色
export const reqAddRole = (roleNameObj) => myAxios.post(`${BASE_URL}/manage/role/add`, roleNameObj)
//请求获取用户列表
export const reqGetUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`)
//请求添加用户
export const reqAddUser = (userInfo) => myAxios.post(`${BASE_URL}/manage/user/add`, userInfo)
//请求更新用户
export const reqUpdateUser = (userInfo) => myAxios.post(`${BASE_URL}/manage/user/update`, userInfo)
//请求删除用户
export const reqDeleteUser = (userId) => myAxios.post(`${BASE_URL}/manage/user/delete`, { userId })
//请求设置角色权限
export const reqSetRoleAuthority = ( _id, menus ) => {
    const auth_name = store.getState().userInfo.user.username
    return myAxios.post(`${BASE_URL}/manage/role/update`, {_id,auth_name,menus,auth_time:Date.now()})
}