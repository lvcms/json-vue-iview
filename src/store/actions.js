import gql from 'graphql-tag'
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
/**
 *[eventUpdate 更新数据事件 更新数据后的返回信息]
 * @param    {[type]}                 mainData       [数据]
 */
export const eventUpdate = ({
    commit
}, params) => {
    commit(types.SET_UPDATE_DATA, {
        params
    })
}
/**
 *[handlerButtonEvent 处理按钮事件]
 * @param    {[type]}                 mainData       [数据]
 */
export const handlerButtonEvent = ({
    commit
}, {
    apollo,
    threadParams,
    params
}) => {
    return new Promise((resolve, reject) => {
        apollo.mutate({
            mutation: gql `mutation ($package: String!, $model: String!, $value: String!) {
                updateModel(package: $package, model: $model, value: $value){
                status,
                message,
                value
                }
            }`,
            variables: {
                package: threadParams.package,
                model: threadParams.model,
                item: threadParams.item,
                value: JSON.stringify(params)
            },
        }).then((result) => {
            resolve(result)
        }).catch((error) => {
            reject(error)
        })
    })
}


