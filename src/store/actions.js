import * as types from './mutation-types'
/**
 *[eventLayout 获取 layout 布局数据时触发]
 * @param    {[type]}                 mainData       [数据]
 */
export const eventLayout = ({commit}, layout) => {
    commit(types.SET_LAYOUT, {layout})
}
/**
 *[eventFormSubmit form 提交实现]
 * @param    {[type]}                 mainData       [数据]
 */
export const eventFormSubmit = ({
    commit
}, result) => {
    result = result.data.updateModel
    commit(types.SET_FORM_SUBMIT, {
        result
    })
    commit(types.SET_ROOT_FORM_SUBMIT, {result}, {
        root: true
    })
    return {
        result,
        message: result.message
    }
}
/**
 *[eventButton 按钮触发]
 * @param    {[type]}                 mainData       [数据]
 */
export const eventButton = ({commit}, params) => {
    commit(types.SET_BUTTON, {
        params
    })
}


