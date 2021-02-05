//用于项目发送请求的模块
import myAxios from './myAxios'  //封装一个用于发送请求的axios
import jsonp from 'jsonp'
import {BASE_URL,WEATHER_URL,LOCATION,AK} from '../config'

// 登录请求
export const reqLogin = values => myAxios.post(`${BASE_URL}/login`, values)
// 获取天气信息的请求
export const reqWeather = () => {jsonp(`${WEATHER_URL}?location=${LOCATION}&output=json&ak=${AK}`, (err,data) => {})}
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
export const reqUpdateProductInfo = (productInfoObj) => myAxios.post(`${BASE_URL}/manage/product/update`,productInfoObj)