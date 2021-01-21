import {SAVE_MENU_TITLE} from '../action_types'

export default function operateSaveTitle(preState = '', action) {
    let { type, data } = action
    let newState
    switch (type) {
        case SAVE_MENU_TITLE:
            newState = data
            return newState
        default:
            return preState
    }    
}