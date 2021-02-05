import { SAVE_CATEGORY_LIST } from '../action_types'
import { message } from 'antd'
// import store from '../store'
import { reqCategoryList } from '../../api'
const createSaveCategoryListAction = (categoryArr) =>({ type: SAVE_CATEGORY_LIST, data: categoryArr})

export const createSaveCategoryListActionAsync = () => {
    return async(dispatch) => {
        let result = await reqCategoryList()
        const { status, data, msg } = result
        if (status === 0) {
            dispatch(createSaveCategoryListAction(data.reverse()))
        } else {
            message.error(msg)
        }
    }
}